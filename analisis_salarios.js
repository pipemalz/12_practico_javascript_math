function getSalarios(nombre, arraySalarios){
    const persona = arraySalarios.find(salario => salario.name == nombre);
    const salarios_persona = persona.trabajos.map(trabajo => trabajo.salario);
    return salarios_persona;
};

function proyectarSalarios(salarios){
    const porcentajes_aumentos = [];
    for (const index in salarios) {
       if(index < (salarios.length-1)){
            const salarioActual = salarios[parseInt(index) + 1];
            const salarioAnterior = salarios[index];
            const aumento = ((salarioActual * 100) / salarioAnterior) - 100;
            porcentajes_aumentos.push(aumento);
       }
    }
    const proyeccion_porcentaje = PlatziMath.calcular_mediana(porcentajes_aumentos);
    const ultimo_salario = salarios[salarios.length -1];
    const aumento = (ultimo_salario*proyeccion_porcentaje)/100;
    const nuevo_salario = ultimo_salario + aumento;
    return nuevo_salario;
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

function proyeccionSalarioEmpresas(empresa){
    if(!empresas[empresa]){
        console.warn('No existe información de la empresa referenciada');
    }else if(empresas[empresa]){
        const empresaYears = Object.keys(empresas[empresa]);
        // const promedios = [];
        // empresaYears.forEach(year => {
        //     promedios.push(medianaSalarioEmpresas(empresa, year));
        // });
        const promedios = empresaYears.map(year => medianaSalarioEmpresas(empresa, year));
        return proyectarSalarios(promedios);
        }
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