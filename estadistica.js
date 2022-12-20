const input_mediana_n1 = document.getElementById('mdn-nm1');
const input_mediana_n2 = document.getElementById('mdn-nm2');
const btn_mdn_add_input = document.getElementById('mdn-add-input');
const btn_mdn_del_input = document.getElementById('mdn-del-input');
const btn_calcular_mediana = document.getElementById('calcular-mediana');
const inputs_mediana = [input_mediana_n1, input_mediana_n2];
const inputs_container = document.querySelector('.card.promedios');
const p_total_valores = document.getElementById('total_valores_mdn');
const p_cantidad_valores = document.getElementById('cantidad_valores_mdn');
const p_valor_mediana = document.getElementById('valor_mediana');

btn_mdn_add_input.addEventListener('click', add_mdn_input);
btn_mdn_del_input.addEventListener('click', del_mdn_input);
btn_calcular_mediana.addEventListener('click', calcular_mediana);

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

function calcular_mediana(){
    const valores = inputs_mediana.map(input => parseInt(input.value));
    const total_valores = valores.reduce((acc,sum) => acc + sum);  
    let mediana = null;
    if(valores.length % 2 != 0){
        mediana = valores[(valores.length-1)/2];
    }else if(valores.length % 2 == 0){
        const n1 = valores[valores.length / 2];
        const n2 = valores[(valores.length / 2)-1];
        console.log(valores,n1, n2);
        mediana = (n1+n2)/2;
    }
    if(verificarValores()){
        p_total_valores.innerText = `Suma de los valores: ${total_valores}`;
        p_cantidad_valores.innerText = `Cantidad de valores: ${inputs_mediana.length}`;
        p_valor_mediana.innerText =`Valor de la mediana: ${mediana}`;
    }else{
        p_total_valores.innerText = 'Por favor ingrese el valor de todos los campos';
        p_cantidad_valores.innerText = '';
        p_valor_mediana.innerText = '';
    }
}

// function calcular_promedio(){
//     const valores = inputs_mediana.map(input => parseInt(input.value));
//     const total_valores = valores.reduce((acc,sum) => acc + sum);   
//     if(verificarValores()){
//         p_total_valores.innerText = `Suma de los valores: ${total_valores}`;
//         p_cantidad_valores.innerText = `Cantidad de valores: ${inputs_mediana.length}`;
//         p_valor_mediana.innerText =`Valor de la mediana: ${total_valores/inputs_mediana.length}`;
//     }else{
//         p_total_valores.innerText = 'Por favor ingrese el valor de todos los campos';
//         p_cantidad_valores.innerText = '';
//         p_valor_mediana.innerText = '';
//     }
// }

function verificarValores(){
    let validado = true;
    inputs_mediana.forEach(input => {
        if(input.value == ''){
            input.style.backgroundColor = 'red';
            validado = false;
        }else{
            input.style.backgroundColor = 'transparent'
        }
    });
    return validado;
}