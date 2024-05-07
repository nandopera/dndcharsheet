const numerosUsados = [];

// Gerar dados
function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Simular rolagem de dados
function simularRolamentos() {
  let resultados = [];
  for (let i = 0; i < 4; i++) {
    resultados.push(rolarDado());
  }
  resultados.sort((a, b) => b - a);
  return resultados[0] + resultados[1] + resultados[2];
}

// Simular seis rolagens
function simularSeisVezes() {
  let resultadosFinais = [];
  for (let i = 0; i < 6; i++) {
    resultadosFinais.push(simularRolamentos());
  }
  return resultadosFinais;
}

// Calcular modificador para um valor de atributo
function calcularModificador(valor) {
  return Math.floor((valor - 10) / 2); // Regra D&D para cálculo de modificador
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

// Rolar dados e configurar elementos para arrastar
document.getElementById('rolar-dados-btn').addEventListener('click', () => {
  const resultadosAtributos = simularSeisVezes();
  const resultadoRolagemDiv = document.getElementById('resultado-rolagem');
  resultadoRolagemDiv.innerHTML = ''; // Limpar resultados anteriores

  resultadosAtributos.forEach((valor, index) => {
    const draggableElement = document.createElement('div');
    draggableElement.classList.add('draggable');
    draggableElement.id = 'draggable' + index;
    draggableElement.textContent = valor;
    configurarDragAndDrop(draggableElement); // Configura drag and drop para o elemento
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
});

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

// Limpa os campos do formulário
function reiniciarValores() {
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

// Configurar eventos de drag and drop
function configurarDragAndDrop(elemento) {
  elemento.setAttribute('draggable', 'true'); // Define como arrastável

  elemento.addEventListener('dragstart', (event) => {
    if (numerosUsados.includes(elemento.id)) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData('text/plain', elemento.id); // Define o ID para transferir
    elemento.style.opacity = '0.5'; // Reduz a opacidade ao arrastar
  });

  elemento.addEventListener('dragend', (event) => {
    elemento.style.opacity = '1'; // Restaura a opacidade após o arraste
  });
}

// Função para permitir drop
function permitirDrop(event) {
  event.preventDefault(); // Permite o drop no evento dragover
}

// Função para lidar com o drop
function tratarDrop(event) {
  event.preventDefault();
  const idElementoArrastado = event.dataTransfer.getData('text/plain');
  const elementoArrastado = document.getElementById(idElementoArrastado);

  const alvo = document.elementFromPoint(event.clientX, event.clientY);

  if (alvo.className === 'atributo-input') {
    alvo.value = elementoArrastado.textContent; // Preenche o campo de input com o valor
    elementoArrastado.remove(); // Remove o elemento arrastado da lista

    // Adiciona o ID ao array de usados
    numerosUsados.push(idElementoArrastado);
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

// Configurar campos de input para permitir drop
document.querySelectorAll('.atributo-input').forEach((input) => {
  input.addEventListener('dragover', permitirDrop); // Permitir o drop
  input.addEventListener('drop', tratarDrop); // Lidar com o drop
});
