function getSalarios(nombre, arraySalarios){
    const persona = arraySalarios.find(salario => salario.name == nombre);
    const salarios_persona = persona.trabajos.map(trabajo => trabajo.salario);
    return salarios_persona;
};

function proyectarSalarios(nombre, arraySalarios){
    const salarios_persona = getSalarios(nombre, arraySalarios);
    const porcentajes_aumentos = [];
    for (const index in salarios_persona) {
       if(index < (salarios_persona.length-1)){
            const salarioActual = salarios_persona[parseInt(index) + 1];
            const salarioAnterior = salarios_persona[index];
            const aumento = ((salarioActual * 100) / salarioAnterior) - 100;
            porcentajes_aumentos.push(aumento);
       }
    }
    const proyeccion_porcentaje = PlatziMath.calcular_mediana(porcentajes_aumentos);
    const ultimo_salario = salarios_persona[salarios_persona.length -1];
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


console.log(proyectarSalarios('Juanita', salarios));

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



/* const empresas {
    Industrias Mokepon : {
        2018: [salario, salario, salario],
        2019:...
    },
    LexCorp : {
        2018:[...]
    }
} */