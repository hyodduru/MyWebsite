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
navbarMenu.addEventListener('click',(event)=>{
    const id = event.target.dataset.id;
    if(id==null){
        return;
    }
    scrollIntoView(`#${id}`)
});

homeBtn.addEventListener('click', ()=>{
    scrollIntoView('#contact');})


//transparent home : Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

window.addEventListener('scroll',()=>{
    if(window.scrollY<homeHeight){
       home.style.opacity = 1 - window.scrollY/homeHeight;
    }
})

//handle arrow-up btn : make arrow-up btn visible at the window scrolls down
const arrowBtn = document.querySelector('.arrow-up');

window.addEventListener('scroll',()=>{
    if(window.scrollY>homeHeight/2){
        arrowBtn.classList.add('visible');
    }else{
        arrowBtn.classList.remove('visible');
    }
})


//scroll to home as the arrow-up btn is clicked
arrowBtn.addEventListener('click', ()=>{
    scrollIntoView('#home')})


function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector) 
    scrollTo.scrollIntoView({behavior: 'smooth'});
}

