const btn_mediana = document.getElementById('btn-mediana');
const btn_promedio = document.getElementById('btn-promedio');
const btn_moda = document.getElementById('btn-moda');
const btn_mdn_add_input = document.getElementById('mdn-add-input');
const btn_mdn_del_input = document.getElementById('mdn-del-input');
const btn_calcular = document.getElementById('btn-calcular');

const input_mediana_n1 = document.getElementById('mdn-nm1');
const input_mediana_n2 = document.getElementById('mdn-nm2');
const inputs_mediana = [input_mediana_n1, input_mediana_n2];
const inputs_container = document.querySelector('.card.promedios');

const p_total_valores = document.getElementById('total_valores_mdn');
const p_cantidad_valores = document.getElementById('cantidad_valores_mdn');
const p_valor_mediana = document.getElementById('valor_mediana');

let funcion_activa = false;

btn_mdn_add_input.addEventListener('click', add_mdn_input);
btn_mdn_del_input.addEventListener('click', del_mdn_input);
btn_mediana.addEventListener('click', activar_funcion);
btn_moda.addEventListener('click', activar_funcion);
btn_promedio.addEventListener('click', activar_funcion);
btn_calcular.addEventListener('click', calcular);

function activar_funcion(e){
    const botones = [btn_mediana, btn_moda, btn_promedio];
    botones.forEach(boton => {
        if(e.target == boton){
            funcion_activa = e.target.id;
            boton.style.backgroundColor = 'green';
            boton.style.color = 'white';
        }else{
            boton.style.backgroundColor = 'unset';
            boton.style.color = 'unset';
        }
    })
}

function add_mdn_input(){
    if(inputs_mediana.length < 10){
        const id = inputs_mediana.length+1;

        const label = document.createElement('label');
        label.setAttribute('for', `mdn-nm${id}`);
        label.innerHTML = `Valor ${id}`;
    
        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', `mdn-nm${id}`);
    
        label.appendChild(input);
        inputs_container.appendChild(label);
    
        inputs_mediana.push(input);
    }
}

function del_mdn_input(){
    if(inputs_mediana.length > 2){
        const id = inputs_mediana.length;
        document.querySelector(`[for=mdn-nm${id}]`).remove();
        inputs_mediana.pop();
    }
}

function calcular(){
    const valores = inputs_mediana.map(input => parseInt(input.value));
    const total_valores = valores.reduce((acc,sum) => acc + sum);
    let resultado = '';
    p_cantidad_valores.innerText = '';
    p_valor_mediana.innerText = '';
    if(funcion_activa && verificarValores()){
        if(funcion_activa == 'btn-mediana'){
            resultado = `Resultado de la mediana: ${calcular_mediana(valores)}`;
        }else if(funcion_activa == 'btn-promedio'){
            resultado = `Resultado del promedio: ${calcular_promedio(valores)}`;
        }else if(funcion_activa == 'btn-moda'){
            resultado = `Resultado de la moda: ${calcular_moda(valores)}`;
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

function calcular_mediana(valores){
    let mediana = null;
    valores = valores.sort((a,b) => a - b);
    if(valores.length % 2 != 0){
        mediana = valores[(valores.length-1)/2];
    }else if(valores.length % 2 == 0){
        const n1 = valores[valores.length / 2]; 
        const n2 = valores[(valores.length / 2)-1];
        mediana = calcular_promedio([n1,n2]);
    }
    return mediana;
}

function calcular_promedio(valores){
    const total_valores = valores.reduce((acc,sum) => acc + sum);
    const promedio = total_valores/valores.length;
    return promedio;
}

function calcular_moda(valores){
    const count = {};
    valores.forEach(valor => {
        if(count[valor] == undefined){
            count[valor] = 1;
        }else{
            count[valor] += 1;
        }
        // count[valor] = (count[valor] || 0) +1;
    });
    const mayor = Math.max(...Object.values(count));
    const numeros_repetidos = [...Object.keys(count)];
    const moda = numeros_repetidos.filter(numero => count[numero] == mayor);
    return moda;
}

function verificarValores(){
    let validado = true;
    inputs_mediana.forEach(input => {
        if(input.value == ''){
            input.style.backgroundColor = 'red';
            validado = false;
        }else{
            input.style.backgroundColor = 'transparent'
        }
        input.addEventListener('click', function () {
            input.style.backgroundColor = 'unset';
        });
    });
    return validado;
}