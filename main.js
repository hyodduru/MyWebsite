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
    navbarMenu.classList.remove('open');
    scrollIntoView(id)
});

homeBtn.addEventListener('click', ()=>{
    scrollIntoView('#contact');})

//navbar toggle btn

const toggleBtn = document.querySelector('.navbar__toggle-btn');
toggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
})

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




//adventure post filtering and animation
const categoryBtns= document.querySelector('.adventure__category');
const adventurePosts = document.querySelectorAll('.adventure__post');
const postContainer = document.querySelector('.adventure__posts');

categoryBtns.addEventListener('click',(event)=>{
    const button = event.target;
    const filterName = button.dataset.filter;
    if(filterName===undefined){
        return;
    }
    postContainer.classList.add('anim-out');
    
    setTimeout(()=>{
        adventurePosts.forEach(post =>  
            { 
              if(filterName === '*' || filterName === post.dataset.type){
                  post.classList.remove('invisible');
              }else{
                  post.classList.add('invisible');
              }       
      })
        postContainer.classList.remove('anim-out') }
       ,300
    )      
})



//1. 모든 섹션과 메뉴들을 가져온다.
//2. 모든 섹션들을 관찰한다.
//3. 위를 바탕으로 메뉴를 활성화시킨다. 


const sectionIds = 
['#home', 
'#about', 
'#value', 
'#adventure', 
'#vision', 
'#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-id = '${id}']`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];


function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)])
}

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected
    selectedNavItem.classList.add('active');
}


const callback = (entries, observer)=>{
    entries.forEach(entry => {
       if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y<0)
            {selectedNavIndex = index + 1}else{
                selectedNavIndex = index -1 
            }          
       }
    })
}

const options = {
    threshold : 0.3,
}

const observer = new IntersectionObserver(callback, options);

sections.forEach(section => observer.observe(section));

window.addEventListener('wheel',()=>{
    if(window.scrollY===0){
        selectedNavIndex =0;
    }else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex = navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})


