const root = document.querySelector(':root');
const html_body = document.querySelector('.body');
const html_header = document.querySelector('.header');
const secciones = {
    mates : document.querySelector('.section--mates'),
    porcentajes : document.querySelector('.section--porcentajes'),
    estadistica : document.querySelector('.section--estadistica'),
    salarios : document.querySelector('.section--salarios')
};
const menu_items = {
    mates: document.querySelector('.menu__item--mates'),
    porcentajes: document.querySelector('.menu__item--porcentajes'),
    estadistica: document.querySelector('.menu__item--estadistica'),
    salarios: document.querySelector('.menu__item--salarios')
};
const menu_buttons = document.querySelectorAll('.menu__item');

menu_buttons.forEach(button => button.addEventListener('click',visibilidadSection));

function visibilidadSection(e){
    html_body.style.justifyContent = 'flex-start';
    html_body.style.padding= '20px 0px';
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

const themes = {
    light : {
        '--background-color' : '#3EECAC',
    },
    dark : {
        '--primary-color' : '#12171A',
        '--secondary-background': '#1F1F1F',
        '--title-color' : '#FC446B',
        '--primary-font' : '#FFFFFF',
        '--secondary-font' : 'rgba(255, 255, 255, 0.8)',
        '--very-light-font' : 'rgba(255, 255, 255, 0.3)',
        '--primary-button' : '#4CAF50',
        '--secondary-button' : '#f44336',
        '--primary-hover-button' : 'green',
        '--secondary-hover-button' : 'red'
    }
}

function setTheme(theme){
    for (const property in themes[theme]) {
        root.style.setProperty(property, themes[theme][property]);
        console.log(property)
    }
}

setTheme('dark')