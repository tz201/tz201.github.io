---
title: My New Post
date: 2026-07-02 11:05:43
tags:
  - the start
categories: 随笔
---
# Hello 

test as a markdown editor  
powerful and simple


math: inline: $\sum _{i=1}^n \binom ni$  
      as a sinle line: $$ \sum _{i=1}^n \binom ni $$

中文测试

c++代码块测试：
```cpp

#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair <double, int> pdi;

const int N = 1e5 + 5;
const double eps = 1e-9;
struct node
{
	double k, b;
} a[N];
int tr[N << 2], cnt;

void init()
{
	a[0].k = 0;
	a[0].b = 0;
}

int cmp(double A, double B)
{
	if (A - B > eps)
		return 1;
		
	if (B - A > eps)
		return -1;
		
	return 0;
}

double calc(int pos, int x)
{
	return a[pos].k * x + a[pos].b;
}

#define ls (x << 1)
#define rs (x << 1 | 1)

void add(double x1, double y1, double x2, double y2)
{
	cnt++;
	if (fabs(x1 - x2) < eps)
	{
		a[cnt].k = 0;
		a[cnt].b = max(y1, y2);
	}
	else
	{
		a[cnt].k = 1.0 * (y2 - y1) / (x2 - x1);
		a[cnt].b = y1 - a[cnt].k * x1;
	}
}

void insert(int x, int l, int r, int id)
{
	int &cur = tr[x];
	int mid = (l + r) >> 1;

	if (cmp(calc(id, mid), calc(cur, mid)) > 0 || (cmp(calc(id, mid), calc(cur, mid)) == 0 && id < cur))
		swap(id, cur);

	if (l == r)
		return;

	double curL = calc(cur, l), curR = calc(cur, r);
	double newL = calc(id, l), newR = calc(id, r);

	if (cmp(newL, curL) > 0 || (cmp(newL, curL) == 0 && id < cur))
		insert(ls, l, mid, id);
	
	if (cmp(newR, curR) > 0 || (cmp(newR, curR) == 0 && id < cur))
		insert(rs, mid + 1, r, id);
}

void modify(int x, int l, int r, int L, int R, int id)
{
	if (L <= l && r <= R)
	{
		insert(x, l, r, id);
		return;
	}
	
	int mid = (l + r) >> 1;
	if (L <= mid)
		modify(ls, l, mid, L, R, id);
	if (mid < R)
		modify(rs, mid + 1, r, L, R, id);
}

pdi pmax(pdi x, pdi y)
{
	if (cmp(x.first, y.first) == -1)
		return y;
	if (cmp(x.first, y.first) == 1)
		return x;
	return x.second < y.second ? x : y;
}

pdi query(int x, int l, int r, int k)
{
	if (r < k || k < l)
		return {0, 0};
	double res = calc(tr[x], k);
	
	int id = tr[x];
	if (l == r)
		return {res, id};
	int mid = (l + r) >> 1;
	
	if (k <= mid)
		return pmax({res, id}, query(ls, l, mid, k));
	else
		return pmax({res, id}, query(rs, mid + 1, r, k));
}

int main()
{
	init();
	ios::sync_with_stdio(0);
	cin.tie(0); cout.tie(0);
	
	int T, lastans = 0;
	cin >> T;
	while (T--)
	{
		int opt;
		cin >> opt;
		if (opt == 1)
		{
			int x1, x2, y1, y2;
			cin >> x1 >> y1 >> x2 >> y2;
			x1 = (x1 + lastans - 1) % 39989 + 1;
			x2 = (x2 + lastans - 1) % 39989 + 1;
			y1 = (y1 + lastans - 1) % 1000000000 + 1;
			y2 = (y2 + lastans - 1) % 1000000000 + 1;
			if (x1 > x2)
				swap(x1, x2), swap(y1, y2);
			add(x1, y1, x2, y2);
			modify(1, 1, 39989, x1, x2, cnt);
		}
		else
		{
			int x;
			cin >> x;
			x = (x + lastans - 1) % 39989 + 1;
			cout << (lastans = query(1, 1, 39989, x).second) << '\n';
		}
	}
	return 0;
}

```