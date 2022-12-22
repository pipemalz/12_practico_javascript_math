class PlatziMath {
    static calcular_promedio(valores){
        const total_valores = valores.reduce((acc,sum) => acc + sum);
        const promedio = total_valores/valores.length;
        return promedio;
    };
    static calcular_promedio_armonico(valores){
        const n = valores.length;
        let suma_inversos = 0;
    
        for (let i = 0; i < valores.length; i++) {
            suma_inversos += 1/valores[i];
        };
        return n / suma_inversos;
    };
    static calcular_moda(valores){
        const count = {};
        valores.forEach(valor => {
            if(count[valor] == undefined){
                count[valor] = 1;
            }else{
                count[valor] += 1;
            };
            //OTRO METODO
            //count[valor] = (count[valor] || 0) +1;
        });
        //METODO con Object.values y Object.keys
        // const mayor = Math.max(...Object.values(count));
        // const numeros_repetidos = [...Object.keys(count)];
        // console.log(ordenado);
        // const moda = numeros_repetidos.filter(numero => count[numero] == mayor);
    
        //METODO con Object.entries
        const conteo = Object.entries(count);
        const conteo_ordenado = conteo.sort((prev, next) => prev[1] - next[1]);
        const moda = conteo_ordenado[conteo_ordenado.length - 1][0];
        return moda;
    };
    static calcular_mediana(valores){
        let mediana = null;
        valores = valores.sort((a,b) => a - b);
        if(valores.length % 2 != 0){
            mediana = valores[(valores.length-1)/2];
        }else if(valores.length % 2 == 0){
            const n1 = valores[valores.length / 2]; 
            const n2 = valores[(valores.length / 2)-1];
            mediana = PlatziMath.calcular_promedio([n1,n2]);
        };
        return mediana;
    };
};