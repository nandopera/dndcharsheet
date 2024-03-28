// Função para rolar o dado de 6 faces
function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função para simular 4 rolamentos, descartar o menor e somar os 3 maiores resultados
function simularRolamentos() {
  let resultados = [];
  
  // Rolar o dado 4 vezes e armazenar os resultados
  for (let i = 0; i < 4; i++) {
    resultados.push(rolarDado());
  }

  // Ordenar os resultados em ordem decrescente
  resultados.sort((a, b) => b - a);
  
  // Somar os 3 maiores resultados
  let soma = resultados[0] + resultados[1] + resultados[2];
  
  return soma;
}

// Função para simular 6 conjuntos de 4 rolamentos e retornar os resultados finais
function simularSeisVezes() {
  let resultadosFinais = [];
  
  // Simular 6 vezes e armazenar os resultados finais
  for (let i = 0; i < 6; i++) {
    resultadosFinais.push(simularRolamentos());
  }
  
  return resultadosFinais;
}

// Exemplo de uso:
console.log("Resultados finais das 6 simulações:", simularSeisVezes());