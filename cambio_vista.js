const html_body = document.querySelector('.body');
const html_header = document.querySelector('.header');
const btn_menu_matematicas = document.querySelector('.menu__item--mates');


btn_menu_matematicas.addEventListener('click', () => {
    html_header.classList.add('header--top');
});