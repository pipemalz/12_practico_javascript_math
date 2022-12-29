const rectangulo_div = document.querySelector('.card__resultados--rectangulo');
const triangulo_div = document.querySelector('.card__resultados--triangulo');
const circulo_div = document.querySelector('.card__resultados--circulo');
const buttons = {
    rectangulo: document.querySelector('.button--rectangulo'),
    triangulo: document.querySelector('.button--triangulo'),
    circulo: document.querySelector('.button--circulo')
};
const inputs = {
    rectangulo : {
        base: document.getElementById('input_base_rectangulo'),
        altura: document.getElementById('input_altura_rectangulo')
    },
    triangulo : {
        base: document.getElementById('input_base_triangulo'),
        lado1: document.getElementById('input_lado1_triangulo'),
        lado2: document.getElementById('input_lado2_triangulo')
    },
    circulo : {
        radio: document.getElementById('input_radio_circulo')
    }
}

for (const button in buttons) {
    buttons[button].addEventListener('click', imprimirDatos);
}

// RECTANGULO/CUADRADO
// PERIMETRO = SUMA DE TODOS LOS LADOS
// AREA = LARGO(ALTURA) X ANCHO(BASE)

class Rectangulo{
    constructor(base, altura){
        this.base = base;
        this.altura = altura;
    }
    perimetro(){
        return (this.base * 2) + (this.altura *2);
    }
    area(){
        return this.base * this.altura;
    }
    print(){
        rectangulo_div.style.display = 'flex';
        rectangulo_div.innerHTML = `<h3> Cuadrado </h3>
        <p> <strong> Base </strong> = ${this.base}px </p>
        <p> <strong> Altura </strong> = ${this.altura}px </p>
        <p> <strong> Perimetro </strong> = ${this.perimetro()}px </p>
        <p> <strong> Area </strong> = ${this.area()}px </p>`;
    }
}

// TRIANGULO
// PERIMETRO = SUMA DE TODOS LOS LADOS
// AREA = (BASE * ALTURA) / 2

class Triangulo{
    constructor(base, l1, l2){
        this.base = base;
        this.l1 = l1;
        this.l2 = l2;
        if(this.l1**2 + this.l2**2 === this.base**2){
            this.tipo = 'rectángulo';
        }else if((this.l1**2 + this.l2**2) < this.base**2){
            this.tipo = 'obtusángulo';
        }else if((this.l1**2 + this.l2**2) > this.base**2){
            this.tipo = 'acutángulo'
        }else 
        if(this.l1 == this.l2 && this.l2 == this.base){
            this.tipo = 'equilátero';
        }else if(this.l1 == this.l2 || this.l2 == this.base || this.base == this.l1){
            this.tipo = 'isóceles';
        }else if(this.l1 != this.l2 && this.l2 != this.base){
            this.tipo = 'escaleno';
        }
    }
    perimetro(){
        return this.base + this.l1 + this.l2;
    }
    semiperimetro(){
        return this.perimetro() / 2;
    }
    // CALCULAR AREA FORMULA HERON CONOCIENDO LOS 3 LADOS
    area(){
        const s = this.semiperimetro();
        const a = this.l1;
        const b = this.l2;
        const c = this.base;
        return Math.sqrt(s* (s-a) * (s-b) * (s-c));
    }
    print(){
        let area;
        if(!this.area()){
            triangulo_div.innerHTML = `No es un triangulo`;
        }else{
            area = this.area();
            triangulo_div.innerHTML = `<p><strong>Triángulo</strong></p>
            <p><strong>Base</strong> = ${this.base}</p>
            <p><strong>Lado 1</strong> = ${this.l1}</p>
            <p><strong>Lado 2</strong> = ${this.l2}</p>
            <p><strong>Perimetro</strong> = ${this.perimetro()}</p>
            <p><strong>Area</strong> = ${area}</p>`
        }
        triangulo_div.style.display = 'flex';

    }
}

function imprimirDatos(e){
    const button = e.target.classList[1];
    if(button == 'button--rectangulo'){
        const base = inputs['rectangulo']['base'].value;
        const altura = inputs['rectangulo']['altura'].value;        if(base != '' && altura != ''){
            const rectangulo = new Rectangulo(parseInt(base), parseInt(altura));
            rectangulo.print();
        }
    }else if(button == 'button--triangulo'){
        const base = inputs['triangulo']['base'].value;
        const lado1 = inputs['triangulo']['lado1'].value;
        const lado2 = inputs['triangulo']['lado2'].value;
        if(base != '' && lado1 != '' && lado2 != ''){
            const triangulo = new Triangulo(parseInt(base), parseInt(lado1), parseInt(lado2));
            triangulo.print();
            console.log(base)
        }
    }else if(button == 'button--circulo'){
        const radio = inputs['circulo']['radio'].value;
        if(radio != ''){
            const circulo = new Circulo(parseInt(radio));
            circulo.print();
        }
    }
}

//CIRCULO 
//DIAMETRO = RADIO * 2
//PERIMETRO = 2 * PI * RADIO
//AREA = PI * RADIO**2

class Circulo{
    constructor(radio){
        this.radio = radio;
        this.diametro = this.radio * 2;
        this.perimetro = 2 * Math.PI  * this.radio;
        this.area = Math.PI * this.radio**2;
    }
    print(){
        circulo_div.style.display = 'flex';
        circulo_div.innerHTML = `<p><strong>Circulo</strong></p> 
        <p><strong>Radio</strong> = ${this.radio}px</p> 
        <p><strong>Diametro</strong> = ${this.diametro}px</p> 
        <p><strong>Perimetro</strong> = ${this.perimetro}px</p> 
        <p><strong>Area</strong> = ${this.area}px</p> `
    }
}

// class TrianguloIsoceles{
//     constructor(base, l){
//         this.base = base;
//         this.l = l;
//     }
//     altura(){
//         if(this.base == this.l){
//             console.log('No es un triangulo isoceles');
//         }else{
//            return Math.sqrt(this.l**2 - (this.base**2 / 4));
//         }
//     }
// }

// const trianguloIsoceles = new TrianguloIsoceles(4, 6);

// class TrianguloEscaleno{
//     constructor(l1,l2,l3){
//         this.l1 = l1;
//         this.l2 = l2;
//         this.l3 = l3;
//     }
//     altura(){
//        //Semiperimetro
//         const s = (this.l1 + this.l2 + this.l3)/2;
//         const a = this.l1;
//         const b = this.l2;
//         const c = this.l3;
//         return Math.floor((2 / a) * Math.sqrt(s * (s - a) * (s - b) * (s - c)));
//     }   
// }

// const trianguloEscaleno = new TrianguloEscaleno(16, 8, 10);