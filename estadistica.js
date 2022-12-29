const btn_mediana = document.getElementById('btn-mediana');
const btn_promedio = document.getElementById('btn-promedio');
const btn_moda = document.getElementById('btn-moda');
const btn_promedio_armonico = document.getElementById('btn-promedio-armonico');
const btn_mdn_add_input = document.getElementById('mdn-add-input');
const btn_mdn_del_input = document.getElementById('mdn-del-input');
const btn_calcular = document.getElementById('btn-calcular');

const input_mediana_n1 = document.getElementById('mdn-nm1');
const input_mediana_n2 = document.getElementById('mdn-nm2');
const inputs_mediana = [input_mediana_n1, input_mediana_n2];
const inputs_container = document.querySelector('#inputs-container');

const p_total_valores = document.getElementById('total_valores_mdn');
const p_cantidad_valores = document.getElementById('cantidad_valores_mdn');
const p_valor_mediana = document.getElementById('valor_mediana');

const div_resultado_promedios = document.querySelector('.card__resultados--promedios');

let funcion_activa = false;

btn_mdn_add_input.addEventListener('click', add_mdn_input);
btn_mdn_del_input.addEventListener('click', del_mdn_input);
btn_mediana.addEventListener('click', activar_funcion);
btn_moda.addEventListener('click', activar_funcion);
btn_promedio.addEventListener('click', activar_funcion);
btn_promedio_armonico.addEventListener('click', activar_funcion);
btn_calcular.addEventListener('click', calcular);

function activar_funcion(e){
    const botones = [btn_mediana, btn_moda, btn_promedio, btn_promedio_armonico];
    botones.forEach(boton => {
        if(e.target == boton){
            funcion_activa = e.target.id;
            boton.classList.add('button--promedios-active');
            boton.classList.remove('button--promedios');
        }else{
            boton.classList.add('button--promedios');
            boton.classList.remove('button--promedios-active');
        }
    })
}

function add_mdn_input(){
    if(inputs_mediana.length < 20){
        const id = inputs_mediana.length+1;

        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', `mdn-nm${id}`);
        input.setAttribute('placeholder', `Valor ${id}`);
        input.classList.add('input');
    
        inputs_container.appendChild(input);
        inputs_mediana.push(input);
    }
}

function del_mdn_input(){
    if(inputs_mediana.length > 2){
        const id = inputs_mediana.length;
        document.querySelector(`[id=mdn-nm${id}]`).remove();
        inputs_mediana.pop();
    }
}

function calcular(){
    const valores = inputs_mediana.map(input => parseInt(input.value));
    const total_valores = valores.reduce((acc,sum) => acc + sum);
    let resultado = '';
    div_resultado_promedios.style.display = 'flex';
    p_cantidad_valores.innerText = '';
    p_valor_mediana.innerText = '';
    if(funcion_activa && verificarValores()){
        if(funcion_activa == 'btn-mediana'){
            resultado = `Resultado de la mediana: ${PlatziMath.calcular_mediana(valores)}`;
        }else if(funcion_activa == 'btn-promedio'){
            resultado = `Resultado del promedio: ${PlatziMath.calcular_promedio(valores)}`;
        }else if(funcion_activa == 'btn-moda'){
            resultado = `Resultado de la moda: ${PlatziMath.calcular_moda(valores)}`;
        }else if(funcion_activa == 'btn-promedio-armonico'){
            resultado = `Resultado del promedio armonico: ${PlatziMath.calcular_promedio_armonico(valores)}`;
        }
        p_total_valores.innerText = `Suma de los valores: ${total_valores}`;
        p_cantidad_valores.innerText = `Cantidad de valores: ${inputs_mediana.length}`;
        p_valor_mediana.innerText = resultado;
    }else if(funcion_activa && !verificarValores()){
        p_total_valores.innerText = 'Por favor ingrese el valor de todos los campos';
    }else if(!funcion_activa && verificarValores()){
        p_total_valores.innerText = 'Por favor seleccione una funcion';
    }else{
        p_total_valores.innerText = 'Por favor seleccione una funcion e ingrese el valor de todos los campos';
    }
}

function verificarValores(){
    let validado = true;
    inputs_mediana.forEach(input => {
        if(input.value == ''){
            input.style.backgroundColor = 'var(--title-color)';
            validado = false;
        }else{
            input.style.backgroundColor = 'var(--primary-color)'
        }
        input.addEventListener('click', function () {
            input.style.backgroundColor = 'var(--primary-color)';
        });
    });
    return validado;
}