// Variável global para armazenar os números usados
const numerosUsados = [];

// Função para rolar o dado de 6 faces
function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função para simular 4 rolamentos, descartar o menor e somar os 3 maiores resultados
function simularRolamentos() {
  let resultados = [];
  for (let i = 0; i < 4; i++) {
    resultados.push(rolarDado());
  }
  resultados.sort((a, b) => b - a);
  return resultados[0] + resultados[1] + resultados[2];
}

// Função para simular 6 conjuntos de 4 rolamentos e retornar os resultados finais
function simularSeisVezes() {
  let resultadosFinais = [];
  for (let i = 0; i < 6; i++) {
    resultadosFinais.push(simularRolamentos());
  }
  return resultadosFinais;
}

// Adiciona evento de click ao botão de rolar dados
document.getElementById('rolar-dados-btn').addEventListener('click', function() {
  rolarDadosAtributos();
});

// Função para rolar os dados dos atributos
function rolarDadosAtributos() {
  const resultadosAtributos = simularSeisVezes();
  const resultadoRolagemDiv = document.getElementById('resultado-rolagem');
  resultadoRolagemDiv.innerHTML = '';

  resultadosAtributos.forEach((valor, index) => {
    const draggableElement = document.createElement('div');
    draggableElement.classList.add('draggable');
    draggableElement.setAttribute('draggable', 'true');
    draggableElement.textContent = valor;
    draggableElement.id = 'draggable' + index;
    draggableElement.addEventListener('dragstart', drag);
    resultadoRolagemDiv.appendChild(draggableElement);
  });

  document.getElementById('form-atributos').style.display = 'flex';

  document.getElementById('resultado-rolagem').addEventListener('drop', function(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const elementoArrastado = document.getElementById(data);
  
    // Mostra o elemento arrastado na lista de resultados
    elementoArrastado.style.display = 'block';
  });
  
}


// Função para preencher a ficha com os atributos
function preencherFicha() {
  const forca = parseInt(document.getElementById('forca').value);
  const destreza = parseInt(document.getElementById('destreza').value);
  const constituicao = parseInt(document.getElementById('constituicao').value);
  const inteligencia = parseInt(document.getElementById('inteligencia').value);
  const sabedoria = parseInt(document.getElementById('sabedoria').value);
  const carisma = parseInt(document.getElementById('carisma').value);

  const fichaAtributos = `
    <h2>Atributos</h2>
    <ul>
      <li>Força: ${forca} (Modificador: ${calcularModificador(forca)})</li>
      <li>Destreza: ${destreza} (Modificador: ${calcularModificador(destreza)})</li>
      <li>Constituição: ${constituicao} (Modificador: ${calcularModificador(constituicao)})</li>
      <li>Inteligência: ${inteligencia} (Modificador: ${calcularModificador(inteligencia)})</li>
      <li>Sabedoria: ${sabedoria} (Modificador: ${calcularModificador(sabedoria)})</li>
      <li>Carisma: ${carisma} (Modificador: ${calcularModificador(carisma)})</li>
    </ul>
  `;

  document.getElementById('ficha-dados-classe').innerHTML = fichaAtributos;
}

// Adiciona evento de submit ao formulário
document.getElementById('form-atributos').addEventListener('submit', function(event) {
  event.preventDefault();
  preencherFicha();
  salvarDados(); // Chama a função para salvar os dados no localStorage
});

document.getElementById('reiniciar-btn').addEventListener('click', function() {
    reiniciarValores();
  });

  function reiniciarValores() {
    // Limpa os campos do formulário
    document.getElementById('forca').value = '';
    document.getElementById('destreza').value = '';
    document.getElementById('constituicao').value = '';
    document.getElementById('inteligencia').value = '';
    document.getElementById('sabedoria').value = '';
    document.getElementById('carisma').value = '';
  
    // Limpa a ficha
    document.getElementById('ficha-dados-classe').innerHTML = '';
  
    // Remove os dados do localStorage
    localStorage.removeItem('atributos');
  
    // Mostra os números usados novamente na lista de resultados
    const draggableElements = document.getElementsByClassName('draggable');
    for (let i = 0; i < draggableElements.length; i++) {
      draggableElements[i].style.display = 'block';
    }
  
    // Limpa o array de números usados
    numerosUsados.length = 0;
  }
  
  

// Função para calcular o modificador com base no valor do atributo
function calcularModificador(valor) {
  return Math.floor((valor - 10) / 2);
}

function salvarDados() {
    const dadosFormulario = {
      forca: document.getElementById('forca').value,
      destreza: document.getElementById('destreza').value,
      constituicao: document.getElementById('constituicao').value,
      inteligencia: document.getElementById('inteligencia').value,
      sabedoria: document.getElementById('sabedoria').value,
      carisma: document.getElementById('carisma').value,
    };
  
    // Converte o objeto para JSON
    const dadosJSON = JSON.stringify(dadosFormulario);
  
    // Salva os dados no localStorage
    localStorage.setItem('atributos', dadosJSON);
  }
  

// Função para permitir o drop
function allowDrop(ev) {
  ev.preventDefault();
}

// Função para iniciar o drag
function drag(ev) {
  const idElementoArrastado = ev.target.id;

  // Se o número já está em uso, cancela o arrasto
  if (numerosUsados.includes(idElementoArrastado)) {
    ev.preventDefault();
    return;
  }

  // Define a posição inicial do elemento arrastado
  ev.dataTransfer.setData("text/plain", ev.target.textContent);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.target.style.opacity = '0.5';

  // Armazena o ID do elemento arrastado
  ev.dataTransfer.setData("text/plain", idElementoArrastado);
}

// Adiciona eventos de toque aos elementos usando Hammer.js
const resultadoRolagemDiv = document.getElementById('draggable');

const mc = new Hammer(document.getElementById('resultado-rolagem'));

mc.on("pan", handleDrag);
mc.on("tap", handleTap);


function handleDrag(ev) {
  const idElementoArrastado = ev.target.id;

  // Se o número já está em uso, cancela o arrasto
  if (numerosUsados.includes(idElementoArrastado)) {
    ev.preventDefault();
    return;
  }

  // Define a posição inicial do elemento arrastado
  ev.dataTransfer.setData("text/plain", idElementoArrastado);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.target.style.opacity = '0.5';

  // Armazena o ID do elemento arrastado
  ev.dataTransfer.setData("text/plain", idElementoArrastado);

  // Adiciona o ID do elemento arrastado ao array de números usados
  numerosUsados.push(idElementoArrastado);
}

function handleTap(ev) {
  const idElementoArrastado = ev.target.id;

  // Se o número já está em uso, cancela o arrasto
  if (numerosUsados.includes(idElementoArrastado)) {
    ev.preventDefault();
    return;
  }

  // Define a posição inicial do elemento arrastado
  const data = ev.dataTransfer.getData("text/plain");
  const valor = parseInt(document.getElementById(data).textContent); // Obtem o valor do elemento arrastado usando o ID
  const elementoArrastado = document.getElementById(data);

  // Atribui o valor ao campo
  ev.target.value = valor;
  ev.target.nextElementSibling.value = calcularModificador(valor);

  // Move o elemento arrastado para dentro do campo
  ev.target.appendChild(elementoArrastado);

  // Oculta o elemento arrastado da lista de resultados
  elementoArrastado.style.display = 'none';

  ev.target.style.opacity = ''; // Restaurar a opacidade do elemento

  // Permite que o elemento seja arrastado novamente
  elementoArrastado.draggable = true;

  // Remove o ID do elemento arrastado do array de números usados
  const indice = numerosUsados.indexOf(data);
  if (indice !== -1) {
    numerosUsados.splice(indice, 1);
  }
}



function dragstart(ev) {
    const idElementoArrastado = ev.target.id;
  
    // Se o elemento é draggable, permite o arrasto
    if (ev.target.classList.contains('draggable')) {
      ev.dataTransfer.setData("text/plain", idElementoArrastado);
      ev.dataTransfer.setData("text/html", ev.target.outerHTML);
      ev.target.style.opacity = '0.5';
    }
  }
  

// Função para executar o drop
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const valor = parseInt(document.getElementById(data).textContent); // Obtem o valor do elemento arrastado usando o ID
    const elementoArrastado = document.getElementById(data);
  
    // Atribui o valor ao campo
    ev.target.value = valor;
    ev.target.nextElementSibling.value = calcularModificador(valor);
  
    // Move o elemento arrastado para dentro do campo
    ev.target.appendChild(elementoArrastado);
  
    // Oculta o elemento arrastado da lista de resultados
    elementoArrastado.style.display = 'none';
  
    ev.target.style.opacity = ''; // Restaurar a opacidade do elemento
  
    // Permite que o elemento seja arrastado novamente
    elementoArrastado.draggable = true;
  }
  

  document.getElementById('forca').addEventListener('input', function() {
    if (this.value === '') {
      const elementoArrastado = document.getElementById('draggable' + this.id);
      elementoArrastado.style.display = 'block';
    }
  });
  
  document.getElementById('destreza').addEventListener('input', function() {
    if (this.value === '') {
      const elementoArrastado = document.getElementById('draggable' + this.id);
      elementoArrastado.style.display = 'block';
    }
  });
  
  document.getElementById('constituicao').addEventListener('input', function() {
    if (this.value === '') {
      const elementoArrastado = document.getElementById('draggable' + this.id);
      elementoArrastado.style.display = 'block';
    }
  });

  document.getElementById('inteligencia').addEventListener('input', function() {
    if (this.value === '') {
      const elementoArrastado = document.getElementById('draggable' + this.id);
      elementoArrastado.style.display = 'block';
    }
  });
  
  document.getElementById('sabedoria').addEventListener('input', function() {
    if (this.value === '') {
      const elementoArrastado = document.getElementById('draggable' + this.id);
      elementoArrastado.style.display = 'block';
    }
  });

  document.getElementById('carisma').addEventListener('input', function() {
    if (this.value === '') {
      const elementoArrastado = document.getElementById('draggable' + this.id);
      elementoArrastado.style.display = 'block';
    }
  });

  document.getElementById('resultado-rolagem').addEventListener('dragstart', function(event) {
    const idElementoArrastado = event.target.id;
  
    // Se o número já está em uso, permite o arrasto
    if (numerosUsados.includes(idElementoArrastado)) {
      event.dataTransfer.setData("text/plain", idElementoArrastado);
      event.dataTransfer.setData("text/html", event.target.outerHTML);
      event.target.style.opacity = '0.5';
    }
  });
  

// Adiciona eventos de toque aos elementos
document.getElementById('resultado-rolagem').addEventListener('touchstart', touchstart);
document.getElementById('resultado-rolagem').addEventListener('touchmove', touchmove);
document.getElementById('resultado-rolagem').addEventListener('touchend', touchend);

// Função para iniciar o toque
function touchstart(ev) {
  const idElementoArrastado = ev.target.id;

  // Se o número já está em uso, cancela o arrasto
  if (numerosUsados.includes(idElementoArrastado)) {
    ev.preventDefault();
    return;
  }

  // Define a posição inicial do elemento arrastado
  const touch = ev.targetTouches[0];
  ev.dataTransfer.setData("text/plain", ev.target.textContent);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML); // Adicionado para manter a referência ao elemento arrastado
  ev.target.style.opacity = '0.5'; // Adicionado para tornar o elemento arrastado semitransparente

  // Armazena o ID do elemento arrastado
  ev.dataTransfer.setData("text/plain", idElementoArrastado);
}

function touchmove(ev) {
  ev.preventDefault();
}

function touchend(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/plain");
  const valor = parseInt(document.getElementById(data).textContent); // Obtem o valor do elemento arrastado usando o ID
  const elementoArrastado = document.getElementById(data);

  // Atribui o valor ao campo
  ev.target.value = valor;
  ev.target.nextElementSibling.value = calcularModificador(valor);

  // Adiciona o ID do elemento arrastado ao array de números usados
  numerosUsados.push(data);

  // Move o elemento arrastado para dentro do campo
  ev.target.appendChild(elementoArrastado);

  // Oculta o elemento arrastado da lista de resultados
  elementoArrastado.style.display = 'none';

  ev.target.style.opacity = ''; // Restaurar a opacidade do elemento
}
