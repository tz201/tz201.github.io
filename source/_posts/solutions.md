---
title: solutions
author: tz201
avatar: /img/avatar.webp
authorLink: tz201.github.io
authorAbout: 人?
authorDesc: 人?
categories: c++
comments: true
date: 2026-09-30 19:39:14
tags:
keywords:
description:
photos:
---

注：` \[ -> $$ \( -> $ `

# P5644

## 50 分做法

题目要求 1 号猎人最后一个死亡的概率。

先用一个经典转化：

> 每次开枪可以看成按仇恨度比例从所有人中随机选一个，如果选中的人已经死了就继续开枪，直到选中一个活着的人。

因此，若当前活着的人仇恨度总和为 K，则某个活着的人 i 被打中的概率就是：

$$
\frac{w_i}{K}
$$

于是可以直接容斥。

设集合 \(S\subseteq \{2,3,\dots,n\}\)，令：

$$
sum(S)=\sum_{i\in S}w_i
$$

若要求 1 号之后死的人至少包含 \(S\) 中所有人，则概率为：

$$
p(S)=\frac{w_1}{w_1+sum(S)}
$$

容斥得到答案：

$$
ans=\sum_{S\subseteq \{2,\dots,n\}}(-1)^{|S|}\frac{w_1}{w_1+sum(S)}
$$

因为 \(\sum w_i\le 5000\)，所以可以用背包 DP 统计每个仇恨度和的容斥系数。

设：

$$
dp[s]=\sum_{\substack{S\subseteq \{2,\dots,n\}\\sum(S)=s}}(-1)^{|S|}
$$

初始：

$$
dp[0]=1
$$

对于每个 \(i=2\sim n\)，做 0/1 背包，加入一个数会使容斥符号取反：

$$
dp[s+w_i]\ -= dp[s]
$$

最后：

$$
ans=w_1\sum_{s=0}^{tot-w_1} dp[s]\cdot \frac{1}{w_1+s}
$$

模意义下用逆元即可。

---

### C++17 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<int> w(n + 1);
    int tot = 0;
    for (int i = 1; i <= n; i++) {
        cin >> w[i];
        tot += w[i];
    }

    vector<long long> dp(tot + 1, 0);
    dp[0] = 1;

    // 背包：dp[s] = sum (-1)^{|S|}，其中 sum(S)=s
    for (int i = 2; i <= n; i++) {
        int wi = w[i];
        for (int s = tot - wi; s >= 0; s--) {
            dp[s + wi] = (dp[s + wi] - dp[s] + MOD) % MOD;
        }
    }

    // 线性预处理逆元
    vector<long long> inv(tot + 1);
    inv[1] = 1;
    for (int i = 2; i <= tot; i++) {
        inv[i] = MOD - (MOD / i) * inv[MOD % i] % MOD;
    }

    long long ans = 0;
    for (int s = 0; s <= tot - w[1]; s++) {
        ans = (ans + dp[s] * inv[w[1] + s]) % MOD;
    }

    ans = ans * w[1] % MOD;
    cout << ans << '\n';

    return 0;
}
```

复杂度：

$$
O(n\cdot \sum w_i)
$$

由于 50 分数据满足 \(\sum w_i\le 5000\)，可以通过。