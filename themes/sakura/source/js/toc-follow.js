document.addEventListener(
'DOMContentLoaded',
function(){


let links=document.querySelectorAll('.toc a');


let titles=[];


links.forEach(function(link){


    let id=link.getAttribute('href');


    let el=document.querySelector(id);


    if(el)
        titles.push({
            el:el,
            link:link
        });


});



window.addEventListener('scroll',function(){


    let current=null;


    titles.forEach(function(item){


        if(
            item.el.offsetTop-150
            <=
            window.scrollY
        )
        {

            current=item;

        }


    });



    links.forEach(function(link){

        link.classList.remove(
            'is-active-link'
        );

    });



    if(current){

        current.link.classList.add(
            'is-active-link'
        );

    }


});


});