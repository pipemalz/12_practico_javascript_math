const p = document.querySelector('p');
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
        p.innerText = `Cuadrado
        Base = ${this.base}px
        Altura = ${this.altura}px
        Perimetro = ${this.perimetro()}px
        Area = ${this.area()}px`
        const cuadradoPrint = document.createElement('div');
        cuadradoPrint.style.width = this.base + 'px';
        cuadradoPrint.style.height = this.altura + 'px';
        cuadradoPrint.style.backgroundColor = 'red';
        document.querySelector('body').appendChild(cuadradoPrint);
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
document.querySelector('body').appendChild(document.createElement('p')).innerText = `Triángulo
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
document.querySelector('body').appendChild(document.createElement('p')).innerText = `Radio
Radio = ${circulo.radio}px
Diametro = ${circulo.diametro}px
Perimetro = ${circulo.perimetro}px
Area = ${circulo.area}px`