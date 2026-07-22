let intro=document.querySelector(".intro-page");

window.addEventListener("scroll",function(){

    if(!intro)return;


    let top=intro.getBoundingClientRect().top;


    if(top < window.innerHeight*0.8){

        intro.classList.add("show");

    }

});