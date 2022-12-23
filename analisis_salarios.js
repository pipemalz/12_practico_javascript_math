function getSalarios(nombre, arraySalarios){
    const persona = arraySalarios.find(salario => salario.name == nombre);
    const salarios_persona = persona.trabajos.map(trabajo => trabajo.salario);
    return salarios_persona;
};

function proyectarSalarios(salarios_persona){
    const aumentos_salario = [];
    salarios_persona.sort((prev,next) => {
        aumentos_salario.push(prev - next);
    });
    const promedio_aumento = PlatziMath.calcular_promedio(aumentos_salario);
    const nuevo_salario = salarios_persona[salarios_persona.length - 1] + promedio_aumento;
    return {aumento: promedio_aumento, nuevo_salario: nuevo_salario};
}

const proyeccion = proyectarSalarios(getSalarios('Alex', salarios));
console.log(proyeccion);

