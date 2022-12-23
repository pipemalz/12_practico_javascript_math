const rectangulo_div = document.querySelector('.rectangulo');
const triangulo_div = document.querySelector('.triangulo');
const circulo_div = document.querySelector('.circulo');

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
        rectangulo_div.innerText = `Cuadrado
        Base = ${this.base}px
        Altura = ${this.altura}px
        Perimetro = ${this.perimetro()}px
        Area = ${this.area()}px`;
    }
}

const cuadrado = new Rectangulo(100, 100);
cuadrado.print();

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
}

const triangulo = new Triangulo(6,8,5);
triangulo_div.innerText = `Triángulo
Base = ${triangulo.base}px
Lado 1 = ${triangulo.l1}px
Lado 2 = ${triangulo.l2}px
Perimetro = ${triangulo.perimetro()}px
Area = ${triangulo.area()}px`


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
}

const circulo = new Circulo(20);
circulo_div.innerText = `Circulo 
Radio = ${circulo.radio}px
Diametro = ${circulo.diametro}px
Perimetro = ${circulo.perimetro}px
Area = ${circulo.area}px`


class TrianguloIsoceles{
    constructor(base, l){
        this.base = base;
        this.l = l;
    }
    altura(){
        if(this.base == this.l){
            console.log('No es un triangulo isoceles');
        }else{
           return Math.sqrt(this.l**2 - (this.base**2 / 4));
        }
    }
}

const trianguloIsoceles = new TrianguloIsoceles(4, 6);

class TrianguloEscaleno{
    constructor(l1,l2,l3){
        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
    }
    altura(){
       //Semiperimetro
        const s = (this.l1 + this.l2 + this.l3)/2;
        const a = this.l1;
        const b = this.l2;
        const c = this.l3;
        return Math.floor((2 / a) * Math.sqrt(s * (s - a) * (s - b) * (s - c)));
    }   
}

const trianguloEscaleno = new TrianguloEscaleno(16, 8, 10);