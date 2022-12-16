const input_precio = document.getElementById('precio');
const input_descuento = document.getElementById('descuento');
const boton_calcular_descuento = document.getElementById('btn-calcular-descuento');
const p_resultado = document.getElementById('precio_con_descuento');
const boton_limpiar = document.getElementById('limpiar-calculo-descuento');

boton_calcular_descuento.addEventListener('click', calcularDescuento);
boton_limpiar.addEventListener('click', limpiarDescuento);

function calcularDescuento(){
    const precio = input_precio.value;
    const descuento = input_descuento.value;
    if(precio != '' && descuento != ''){
        const precio_final = precio - (precio * (descuento/100));
        p_resultado.innerText = 'Precio final: ' + precio_final;
    }else{
        p_resultado.innerText = 'Por favor llene los campos';
    }
}

function limpiarDescuento(){
    input_precio.value = '';
    input_descuento.value = '';
    p_resultado.innerText = '';
}