// function rolarDados(quantidade) {
//     let resultados = [];
//     for (let i = 0; i < 6; i++) {
//         let soma = 0;
//         for (let j = 0; j < 4; j++) {
//           soma += Math.floor(Math.random() * 6) + 1;
//         }
//         resultados.push(soma);
//       }
      
//       return resultados;
    
  
//     resultados.sort((a, b) => a - b); // Ordena do menor para o maior
  
//     if (quantidade > 1) {
//       resultados.shift(); // Remove o menor resultado
//     }
  
//     return resultados.reduce((a, b) => a + b, 0); // Soma os resultados
//   }

//   const resultado = rolarDados(6);
//   console.log(`Soma dos 3 maiores resultados: ${resultado}`);
  
function rolarDados(quantidade) {
    let resultados = [];
    for (let i = 0; i < quantidade; i++) {
      let soma = 0;
      for (let j = 0; j < 4; j++) {
        soma += Math.floor(Math.random() * 6) + 1;
      }
      
      resultados.sort((a, b) => a - b);
      
      if (quantidade > 1) {
        resultados.shift();
      }
      
      // Verifica se o valor final é maior que 18
      if (soma > 18) {
        soma = 18;
      }
      
      resultados.push(soma);
    }
    return resultados;
  }
  
  const resultados = [];
  for (let i = 0; i < 6; i++) {
    resultados.push(rolarDados(4));
  }
  
  console.log(resultados);
  

  //D10

  function rolarDadoD10(quantidade) {
    let resultado = [];
    for (let i = 0; i < quantidade; i++) {
      let soma = 0;
      for (let j = 0; j < 4; j++) {
        soma += Math.floor(Math.random() * 10) + 1;
      }
      
      resultado.sort((a, b) => a - b);
      
      resultado.push(soma);
    }
    return resultado;
  }
  
  const resultado = [];
  for (let i = 0; i < 1; i++) {
    resultado.push(rolarDados(1));
  }

  console.log(resultado);