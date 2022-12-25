const datalist_persona = document.getElementById('select-persona');
const input_persona = document.getElementById('input-persona');
const salario_persona_div = document.querySelector('.card__resultados--persona');
const buttons_salario = {
    salario_persona : document.querySelector('.button--salario-persona')
};

for (const button in buttons_salario) {
    buttons_salario[button].addEventListener('click', imprimirSalarioPersona);
}

salarios.forEach(salario => {
    const option = document.createElement('option');
    option.setAttribute('value', salario.name);
    datalist_persona.appendChild(option);
});

class Persona{
    constructor(nombre){
        this.nombre = nombre;
        this.salarios = this.getSalarios();
        this.proyeccion_salario = this.proyectarSalarios();
        this.trabajos = this.getTrabajos();
    };
    getSalarios(){
        const persona = salarios.find(salario => salario.name == this.nombre);
        const salarios_persona = persona.trabajos.map(trabajo => trabajo.salario);
        return salarios_persona;
    };
    getTrabajos(){
        const persona = salarios.find(salario => salario.name == this.nombre);
        return persona.trabajos;
    };
    proyectarSalarios(){
        const porcentajes_aumentos = [];
        for (const index in this.salarios) {
           if(index < (this.salarios.length-1)){
                const salarioActual = this.salarios[parseInt(index) + 1];
                const salarioAnterior = this.salarios[index];
                const aumento = ((salarioActual * 100) / salarioAnterior) - 100;
                porcentajes_aumentos.push(aumento);
           }
        }
        const proyeccion_porcentaje = PlatziMath.calcular_mediana(porcentajes_aumentos);
        const ultimo_salario = this.salarios[this.salarios.length -1];
        const aumento = (ultimo_salario*proyeccion_porcentaje)/100;
        const nuevo_salario = ultimo_salario + aumento;
        return nuevo_salario;
    };
    printTrabajos(){
        let texto = '';
        this.trabajos.forEach(trabajo => {
            texto += `<p><strong>Año: </strong>${trabajo.year}, <strong>Empresa: </strong>${trabajo.empresa}, <strong>Salario: </strong> ${trabajo.salario}</p>`
        });
        return texto;
    }
    print(){
        salario_persona_div.innerHTML = `<h4> Análisis salarial de ${this.nombre} </h4>
        <p><strong>Proyeccion salario: </strong>${this.proyectarSalarios()}</p>
        ${this.printTrabajos()}`;
    }
};

function imprimirSalarioPersona(){
    if(input_persona.value != ''){
        const persona = new Persona(input_persona.value);
        persona.print();
    }
}

// function proyectarSalarios(salarios_persona){
//     const aumentos_salario = [];
//     salarios_persona.sort((prev,next) => {
//         aumentos_salario.push(prev - next);
//     });
//     const promedio_aumento = PlatziMath.calcular_promedio(aumentos_salario);
//     const nuevo_salario = salarios_persona[salarios_persona.length - 1] + promedio_aumento;
//     return {aumento: promedio_aumento, nuevo_salario: nuevo_salario};
// }

//Encontrar a todas las personas que en cada año hayan trabajado en la empresa que necesitemos

// function estructurarEmpresas(arraySalarios){
//     const trabajos_globales = [];
//     arraySalarios.forEach(salario => {
//         trabajos_globales.push(...salario.trabajos);
//     });
//     const empresas = {};
//     for (let i = 0; i < trabajos_globales.length; i++) {
//         empresas[trabajos_globales[i].empresa] = {};
//     }

//     for (const empresa in empresas) {
//         for (let i = 0; i < trabajos_globales.length; i++) {
//             if(trabajos_globales[i].empresa == empresa){
//                 empresas[empresa][trabajos_globales[i].year] = [];
//             }
//         }
//         for (let i = 0; i < trabajos_globales.length; i++) {
//             if(trabajos_globales[i].empresa == empresa){
//                 empresas[empresa][trabajos_globales[i].year].push(trabajos_globales[i].salario);
//             }
//         }
//     }
//     return empresas;
// }
const empresas = estructurarEmpresas(salarios);
function estructurarEmpresas(arraySalarios){
    const empresas = {};
    for(const salario of arraySalarios){
        for(const trabajo of salario.trabajos){
            if(!empresas[trabajo.empresa]){
                empresas[trabajo.empresa] = {};
            }
            if(!empresas[trabajo.empresa][trabajo.year]){
                empresas[trabajo.empresa][trabajo.year] = [];
            }
            empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
        } 
    }
    return empresas;
}

function medianaSalarioEmpresas(empresa, year){
    if(!empresas[empresa]){
       console.warn('No existe información de la empresa referenciada');
    }else if(!empresas[empresa][year]){
        console.warn('La empresa referenciada no dio salarios en ese año');
    }else{
        return PlatziMath.calcular_mediana(empresas[empresa][year]);
    }
}

// function proyeccionSalarioEmpresas(empresa, option=0){
//     if(!empresas[empresa]){
//         console.warn('No existe información de la empresa referenciada');
//     }else if(empresas[empresa] && option == 0){
//         const mediana_salarios = [];
//         const aumentos = [];
//         for (const year in empresas[empresa]) {
//             mediana_salarios.push(PlatziMath.calcular_mediana(empresas[empresa][year]));
//         };
//         for (let i = 1; i < mediana_salarios.length; i++) {
//             aumentos.push(mediana_salarios[i] - mediana_salarios[i-1]);
//         };
//         const mediana_aumentos = PlatziMath.calcular_mediana(aumentos);
//         const proyeccion = mediana_salarios[mediana_salarios.length - 1] + mediana_aumentos;
//         return proyeccion;
//     }else if(empresas[empresa] && option == 1){
//         const lowest_salarios = [];
//         const highest_salarios = [];
//         for (const year in empresas[empresa]) {
//             const salarios_ordenados = empresas[empresa][year].sort((a,b) => a - b);
//             lowest_salarios.push(salarios_ordenados[0]);
//             highest_salarios.push(salarios_ordenados[salarios_ordenados.length -1]);
//         };
//         return {
//             lower: PlatziMath.calcular_mediana(lowest_salarios),
//             higher: PlatziMath.calcular_mediana(highest_salarios)
//         }
//     }
// }

function proyeccionSalarioEmpresas(empresa, option=0){
    if(!empresas[empresa]){
        console.warn('No existe información de la empresa referenciada');
    }else if(empresas[empresa] && option == 0){
        const empresaYears = Object.keys(empresas[empresa]);
        // const promedios = [];
        // empresaYears.forEach(year => {
        //     promedios.push(medianaSalarioEmpresas(empresa, year));
        // });
        const promedios = empresaYears.map(year => medianaSalarioEmpresas(empresa, year));
        return proyectarSalarios(promedios);
    }else if(empresas[empresa] && option == 1){
        const lowest_salarios = [];
        const highest_salarios = [];
        for (const year in empresas[empresa]) {
            const salarios_ordenados = empresas[empresa][year].sort((a,b) => a - b);
            lowest_salarios.push(salarios_ordenados[0]);
            highest_salarios.push(salarios_ordenados[salarios_ordenados.length -1]);
        };
        return {
            'Salario mas bajo': PlatziMath.calcular_mediana(lowest_salarios),
            'Salario mas alto': PlatziMath.calcular_mediana(highest_salarios)
        }
    }
}
function top10Salarios(salarios){
    // const personas = salarios.map(salario => salario.name);
    const salarios_globales = salarios.map(salario => {
        return PlatziMath.calcular_mediana(getSalarios(salario.name, salarios));
    });
    salarios_globales.sort((a,b) => a-b);
    const cantidad_top10 = ~~(salarios_globales.length * 0.10);
    const top10 = salarios_globales.slice(
        salarios_globales.length - cantidad_top10,
        salarios_globales.length
    );
    const medianaTop10 = PlatziMath.calcular_mediana(top10);
    return medianaTop10;
}

/* const empresas {
    Industrias Mokepon : {
        2018: [salario, salario, salario],
        2019:...
    },
    LexCorp : {
        2018:[...]
    }
} */