(function(){

let cover = document.querySelector('.home-cover-section');
let intro = document.querySelector('.home-intro-section');
let post = document.querySelector('.home-post-section');

if(!cover || !intro || !post)
    return;


let lock = false;


function moveTo(target)
{

    lock = true;

    window.scrollTo({

        top: target.offsetTop,

        behavior:'smooth'

    });


    setTimeout(function(){

        lock = false;

    },650);

}



window.addEventListener('wheel',function(e){


    if(lock)
    return;

	if(Math.abs(e.deltaY)<10)
    return;
    let y = window.scrollY;

    let h = window.innerHeight;



    /*
        向下
    */


    if(e.deltaY > 0)
    {


        // 第一屏 -> 第二屏

        if(y < h * 0.75)
        {

            e.preventDefault();

            moveTo(intro);

            return;

        }



        // 第二屏 -> 第三部分

        if(
            y >= h * 0.25 &&
            y < post.offsetTop - 50
        )
        {

            e.preventDefault();

            moveTo(post);

            return;

        }


    }




    /*
        向上
    */


    if(e.deltaY < 0)
    {


        // 第二屏 -> 第一屏

        if(
            y > h * 0.5 &&
            y < post.offsetTop - 50
        )
        {

            e.preventDefault();

            moveTo(cover);

            return;

        }



        // 第三部分 -> 第二屏

        if(
            y >= post.offsetTop &&
            y < post.offsetTop + 200
        )
        {

            e.preventDefault();

            moveTo(intro);

            return;

        }


    }



},{passive:false});


})();