'use strict';
// transparent navbar
const navbar= document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height;

window.addEventListener('scroll',()=>{
    if(window.scrollY>navbarHeight){
        navbar.classList.add('active');
    }else{
        navbar.classList.remove('active');
    }
})

// scroll to section
const navbarMenu = document.querySelector('.navbar__menu');
const homeBtn = document.querySelector('.home__btn');
navbarMenu.addEventListener('click',scrollToSection);
homeBtn.addEventListener('click', scrollToSection);

function scrollToSection(event){
    const id = event.target.dataset.id;
    if(id==null){
        return;
    }
    const section = document.querySelector(`#${id}`);
    section.scrollIntoView({behavior :"smooth"})
}
