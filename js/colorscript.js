function alternarEsquemaCores() {
    // Obtém o elemento do controle de alternância
    let toggle = document.getElementById('color-scheme-toggle');

    // Obtém o elemento do corpo
    let body = document.body;
    
    // Obtém o elemento da ficha
    let ficha = document.querySelector('.ficha');

    // Obtém o ícone do toggle
    let icon = document.querySelector('.color-scheme-toggle::before');

    // Alterna entre os esquemas de cores claro e escuro
    if (toggle.checked) {
        body.classList.add('dark');
        body.classList.remove('light');
        ficha.classList.add('dark');
        ficha.classList.remove('light');
        icon.style.content = '\f186'; // Altera o ícone para o escuro
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
        ficha.classList.add('light');
        ficha.classList.remove('dark');
        icon.style.content = '\f185'; // Altera o ícone para o claro
    }
}
