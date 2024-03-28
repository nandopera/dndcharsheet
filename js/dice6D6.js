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

// Função para rolar os dados dos atributos
function rolarDadosAtributos() {
    const resultadosAtributos = simularSeisVezes();
    const resultadoRolagemDiv = document.getElementById('resultado-rolagem');
    resultadoRolagemDiv.innerHTML = ''; // Limpar conteúdo anterior
    
    resultadosAtributos.forEach(valor => {
        const draggableElement = document.createElement('div');
        draggableElement.classList.add('draggable');
        draggableElement.setAttribute('draggable', 'true');
        draggableElement.textContent = valor;
        draggableElement.addEventListener('dragstart', drag);
        resultadoRolagemDiv.appendChild(draggableElement);
    });
    
    document.getElementById('form-atributos').style.display = 'block';
}

// Adiciona evento de click ao botão de rolar dados
document.getElementById('rolar-dados-btn').addEventListener('click', function() {
    rolarDadosAtributos();
});// Função para calcular o modificador com base no valor do atributo
function calcularModificador(valor) {
    return Math.floor((valor - 10) / 2);
}

// Função para rolar os dados dos atributos
function rolarDadosAtributos() {
    const resultadosAtributos = simularSeisVezes();
    const resultadoRolagemDiv = document.getElementById('resultado-rolagem');
    resultadoRolagemDiv.innerHTML = ''; // Limpar conteúdo anterior
    
    resultadosAtributos.forEach(valor => {
        const draggableElement = document.createElement('div');
        draggableElement.classList.add('draggable');
        draggableElement.setAttribute('draggable', 'true');
        draggableElement.textContent = valor;
        draggableElement.addEventListener('dragstart', drag);
        resultadoRolagemDiv.appendChild(draggableElement);
    });
    
    document.getElementById('form-atributos').style.display = 'block';
}

// Adiciona evento de click ao botão de rolar dados
document.getElementById('rolar-dados-btn').addEventListener('click', function() {
    rolarDadosAtributos();
});

// Função para preencher a ficha com os atributos
function preencherFicha() {
    const forca = parseInt(document.getElementById('forca').textContent);
    const destreza = parseInt(document.getElementById('destreza').textContent);
    const constituicao = parseInt(document.getElementById('constituicao').textContent);
    const inteligencia = parseInt(document.getElementById('inteligencia').textContent);
    const sabedoria = parseInt(document.getElementById('sabedoria').textContent);
    const carisma = parseInt(document.getElementById('carisma').textContent);
    
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
});

// Função para permitir o drop
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  // Função para iniciar o drag
  function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.textContent);
    ev.dataTransfer.setData("text/html", ev.target.outerHTML); // Adicionado para manter a referência ao elemento arrastado
    ev.target.style.opacity = '0.5'; // Adicionado para tornar o elemento arrastado semitransparente
  }
  
  // Função para executar o drop
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const valor = parseInt(data);
    const elementoArrastado = document.querySelector('.draggable[textContent="' + data + '"]');
  
    // Atribui o valor ao campo
    ev.target.value = valor;
    ev.target.nextElementSibling.value = calcularModificador(valor);
  
    // Move o elemento arrastado para dentro do campo
    ev.target.appendChild(elementoArrastado);
  
    // Oculta o elemento arrastado da lista de resultados
    elementoArrastado.style.display = 'none';
  }
  
  // Função para trocar valores automaticamente ao arrastar
  document.getElementById('rolamento').addEventListener('dragenter', function(event) {
    const elementoArrastadoHtml = event.dataTransfer.getData("text/html");
    const numeroArrastado = parseInt(elementoArrastadoHtml.match(/\d+/)[0]);
    const campoDestino = event.target;
  
    // Se o campo de destino já tiver um valor
    if (campoDestino.value) {
      trocarValores(elementoArrastado, campoDestino);
    }
  
    // Evitar a propagação do evento
    event.preventDefault();
  });
  
  



// // Teste modificadores

// // Função para calcular o modificador com base no valor do atributo
// function calcularModificador(valor) {
//     return Math.floor((valor - 10) / 2);
// }

// // Função para atualizar os modificadores dos atributos
// function atualizarModificadores() {
//     const forca = parseInt(document.getElementById('forca').value);
//     const destreza = parseInt(document.getElementById('destreza').value);
//     const constituicao = parseInt(document.getElementById('constituicao').value);
//     const inteligencia = parseInt(document.getElementById('inteligencia').value);
//     const sabedoria = parseInt(document.getElementById('sabedoria').value);
//     const carisma = parseInt(document.getElementById('carisma').value);

//     document.getElementById('modificadorForca').value = calcularModificador(forca);
//     document.getElementById('modificadorDestreza').value = calcularModificador(destreza);
//     document.getElementById('modificadorConstituicao').value = calcularModificador(constituicao);
//     document.getElementById('modificadorInteligencia').value = calcularModificador(inteligencia);
//     document.getElementById('modificadorSabedoria').value = calcularModificador(sabedoria);
//     document.getElementById('modificadorCarisma').value = calcularModificador(carisma);
// }

// // Função para rolar os dados dos atributos
// function rolarDadosAtributos() {
//     const resultadosAtributos = simularSeisVezes();
//     const resultadoRolagemDiv = document.getElementById('resultado-rolagem');
//     resultadoRolagemDiv.innerHTML = ''; // Limpar conteúdo anterior
    
//     resultadosAtributos.forEach(valor => {
//         const draggableElement = document.createElement('div');
//         draggableElement.classList.add('draggable');
//         draggableElement.setAttribute('draggable', 'true');
//         draggableElement.textContent = valor;
//         draggableElement.addEventListener('dragstart', drag);
//         resultadoRolagemDiv.appendChild(draggableElement);
//     });
    
//     // Atualizar os modificadores após rolar os dados
//     atualizarModificadores();

//     document.getElementById('form-atributos').style.display = 'block';
// }

// // Adiciona evento de click ao botão de rolar dados
// document.getElementById('rolar-dados-btn').addEventListener('click', function() {
//     rolarDadosAtributos();
// });

// // Adiciona evento de input aos campos de atributos para atualizar os modificadores
// document.querySelectorAll('.atributo-input').forEach(input => {
//     input.addEventListener('input', atualizarModificadores);
// });
