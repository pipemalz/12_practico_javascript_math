const input_precio = document.getElementById('precio');
const input_precio2 = document.getElementById('precio2');
const input_cupon_descuento = document.getElementById('cupon_descuento');
const input_descuento = document.getElementById('descuento');
const boton_calcular_descuento = document.getElementById('btn-calcular-descuento');
const boton_calcular_descuento_cupon = document.getElementById('btn-calcular-descuento-cupon');
const p_resultado = document.getElementById('precio_con_descuento');
const p_resultado_cupon = document.getElementById('precio_con_descuento_cupon');
const boton_limpiar = document.getElementById('limpiar-calculo-descuento');
const boton_limpiar_cupon = document.getElementById('limpiar-calculo-descuento-cupon');

boton_calcular_descuento.addEventListener('click', mostrarPrecioDescuento);
boton_limpiar.addEventListener('click', limpiarDescuento);
boton_calcular_descuento_cupon.addEventListener('click', mostrarPrecioDescuentoCupon);
boton_limpiar_cupon.addEventListener('click', limpiarDescuentoCupon)

function calcularDescuento(precio, descuento){
    return precio - (precio * (descuento/100));
};

function mostrarPrecioDescuento(){
    const precio = input_precio.value;
    const descuento = input_descuento.value;
    if(parseInt(descuento) > 100){
        p_resultado.innerText = 'Descuento debe estar entre 1 y 100';
    }else if(precio != '' && descuento != ''){
        p_resultado.innerText = 'Precio final: ' + calcularDescuento(precio, descuento);
    }
}

function limpiarDescuento(){
    input_precio.value = '';
    input_descuento.value = '';
    p_resultado.innerText = '';
};

function mostrarPrecioDescuentoCupon(){
    const precio = input_precio2.value;
    const cupon = input_cupon_descuento.value;
    let descuento = 0;
    if(precio != '' && cupon != ''){
        if(cupon == 'BLACKFRIDAY'){
            descuento = 60;
            p_resultado_cupon.innerText = `Descuento del ${descuento}% aplicado! precio final: ${calcularDescuento(precio, descuento)}`;
        }else if(cupon == 'SUMMERDAYS'){
            descuento = 40;
            p_resultado_cupon.innerText = `Descuento del ${descuento}% aplicado! precio final: ${calcularDescuento(precio, descuento)}`;
        }else if(cupon == 'SPECIALDAYS'){
            descuento = 20;
            p_resultado_cupon.innerText = `Descuento del ${descuento}% aplicado! precio final: ${calcularDescuento(precio, descuento)}`;
        }else{
            p_resultado_cupon.innerText = `Codigo de cupon inválido!`;
        };
    }else{
        p_resultado_cupon.innerText = 'Por favor llene los campos';
    };
}


function limpiarDescuentoCupon(){
    input_precio2.value = '';
    input_cupon_descuento.value = '';
    p_resultado_cupon.innerText = '';
}