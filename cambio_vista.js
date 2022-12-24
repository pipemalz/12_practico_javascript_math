const html_body = document.querySelector('.body');
const html_header = document.querySelector('.header');
const secciones = {
    mates : document.querySelector('.section--mates'),
    porcentajes : document.querySelector('.section--porcentajes'),
    estadistica : document.querySelector('.section--estadistica')
};
const menu_items = {
    mates: document.querySelector('.menu__item--mates'),
    porcentajes: document.querySelector('.menu__item--porcentajes'),
    estadistica: document.querySelector('.menu__item--estadistica'),
};
const menu_buttons = document.querySelectorAll('.menu__item');

menu_buttons.forEach(button => button.addEventListener('click',visibilidadSection));

function visibilidadSection(e){
    html_body.style.justifyContent = 'flex-start';
    const boton = e.target;
    const clase = boton.classList[1];
    const seccion_name = clase.split('--')[1];
    for (const seccion_html in secciones) {
        if(seccion_name == seccion_html){
            secciones[seccion_html].classList.add('section--active');
            secciones[seccion_html].classList.remove('section--inactive');

            menu_items[seccion_html].classList.add('menu__item--active');
            menu_items[seccion_html].classList.remove('menu__item--inactive');
        }else{
            secciones[seccion_html].classList.add('section--inactive');
            secciones[seccion_html].classList.remove('section--active');
            
            menu_items[seccion_html].classList.add('menu__item--inactive');
            menu_items[seccion_html].classList.remove('menu__item--active');
        }
    }
}

