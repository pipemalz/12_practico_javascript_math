const input_precio = document.getElementById('precio');
const input_descuento = document.getElementById('descuento');
const boton_calcular_descuento = document.getElementById('btn-calcular-descuento');
const boton_calcular_descuento_cupon = document.getElementById('btn-calcular-descuento-cupon');
const p_resultado = document.getElementById('precio_con_descuento');
const boton_limpiar = document.getElementById('limpiar-calculo-descuento');
const boton_limpiar_cupon = document.getElementById('limpiar-calculo-descuento-cupon');
const input_precio2 = document.getElementById('precio2');
const input_cupon_descuento = document.getElementById('cupon_descuento');
const p_resultado_cupon = document.getElementById('precio_con_descuento_cupon');
const div_resultado_descuento = document.querySelector('.card__resultados--descuento');
const div_resultado_cupones = document.querySelector('.card__resultados--cupones');

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
    div_resultado_descuento.style.display = 'flex';
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
    div_resultado_descuento.style.display = 'none';
};

function mostrarPrecioDescuentoCupon(){
    const precio = input_precio2.value;
    const cuponInput = input_cupon_descuento.value;
    let cuponValido = false;

    if(precio != '' && cuponInput != ''){
        //METODO OBJETO CLAVE:VALOR
        // const cupones2 = {
        //     'NEVERSTOPLEARNING' : 80,
        //     'BLACKFRIDAY' : 60,
        //     'SUMMERDAYS' : 40,
        //     'SPECIALDAYS' : 20
        // }
        // if(cupones2[cuponInput]){
        //     p_resultado_cupon.innerText = `Descuento del ${cupones2[cuponInput]}% aplicado! precio final: ${calcularDescuento(precio, cupones2[cuponInput])}`;
        // }else{
        //     p_resultado_cupon.innerText = `Código de cupón inválido!`;
        // }

        //METODOS ARRAYS
        const cupones = [
            {
                'code' : 'NEVERSTOPLEARNING',
                'discount' : 80
            },
            {
                'code' : 'BLACKFRIDAY',
                'discount' : 60
            },
            {   
                'code' : 'SUMMERDAYS',
                'discount' : 40
            },
            {
                'code' : 'SPECIALDAYS',
                'discount' : 20
            }
        ];
   
        // METODO FOR EACH

        // cupones.forEach(cupon => {
        //     if(cupon.code == cuponInput){
        //         p_resultado_cupon.innerText = `Descuento del ${cupon.discount}% aplicado! precio final: ${calcularDescuento(precio, cupon.discount)}`;
        //         cuponValido = true;
        //     }
        // })
        // if(cuponValido == false){
        //     p_resultado_cupon.innerText = 'Código de cupón inválido!';
        // }

        //METODO FILTER
        // let cuponDescuento = cupones.filter(cupon => cupon.code == cuponInput);
        // if(cuponDescuento[0] != undefined){
        //     p_resultado_cupon.innerText = `Descuento del ${cuponDescuento[0].discount}% aplicado! precio final: ${calcularDescuento(precio, cuponDescuento[0].discount)}`;
        // }else{
        //     p_resultado_cupon.innerText = `Código de cupón inválido!`;
        // }

        // METODO FIND
        let cuponDescuento = cupones.find(cupon => cupon.code == cuponInput);
        div_resultado_cupones.style.display = 'flex';
        if(cuponDescuento != undefined){
            p_resultado_cupon.innerText = `Descuento del ${cuponDescuento.discount}% aplicado! precio final: ${calcularDescuento(precio, cuponDescuento.discount)}`;
        }else{
            p_resultado_cupon.innerText = `Código de cupón inválido!`;
        }

    }else{
        p_resultado_cupon.innerText = 'Por favor llene los campos';
    };
}

function limpiarDescuentoCupon(){
    input_precio2.value = '';
    input_cupon_descuento.value = '';
    p_resultado_cupon.innerText = '';
    div_resultado_cupones.style.display = 'none';
}