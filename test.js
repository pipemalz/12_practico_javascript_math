const obj = {
    123: 'Juanito Alcachofa',
    456: 'Juanita Alcaparra',
  };
  
  console.log(solution(obj));

function solution(obj) {
    const resultado = Object.entries(obj).map(myObj => {
        return  {
            id : myObj[0],
            name : myObj[1]
        };
    });
    return resultado;
// Tu código aquí 👈
}
  