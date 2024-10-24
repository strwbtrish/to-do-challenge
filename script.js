'use script';

const switchTheme = document.querySelector('.switch-theme');
const body = document.querySelector('body');
const container = document.querySelector('.container');
const detailBox = document.querySelector('.project-box-details-box');
const linkBox = document.querySelector('.project-box-links-box');
const userInput = document.querySelector('.todo-input');


switchTheme.addEventListener('click', function() {

    switchTheme.classList.toggle('light-theme');
    switchTheme.style.opacity = 0;


setTimeout(() =>
{
    body.classList.toggle('light-theme');

    if (switchTheme.classList.contains('light-theme')) {
        switchTheme.src = 'images/icon-moon.svg'; 
        switchTheme.style.opacity = 1;
       
    }

    else {
        switchTheme.src = 'images/icon-sun.svg';
        switchTheme.style.opacity = 1;

    }

}, 300) // 0.3s
});
