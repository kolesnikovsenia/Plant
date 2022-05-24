const burgerButtonSelector = document.querySelector('.burger');
const mobileMenuSelector = document.querySelector('.mobile_menu');
const closeButtonSelector = document.querySelector('.burger_close');
const bodyWrapperSelector = document.querySelector('.body_wrapper');
const mobileMenuItemSelector = document.querySelector('.mobile_menu_item_link')
const menuSelector = document.querySelector('.menu')


burgerButtonSelector.addEventListener("click",()=>{
    mobileMenuSelector.classList.add("active")
    bodyWrapperSelector.classList.add("active")
})

closeButtonSelector.addEventListener("click",()=>{
    menuSelector.classList.remove("active")
    mobileMenuSelector.classList.remove("active")
    bodyWrapperSelector.classList.remove("active")
})

mobileMenuItemSelector.addEventListener("click",()=>{
    menuSelector.classList.remove("active")
    mobileMenuSelector.classList.remove("active")
    bodyWrapperSelector.classList.remove("active")
})