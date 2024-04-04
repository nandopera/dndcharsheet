function alternarEsquemaCores() {
    // Obtém o elemento do controle de alternância
    var toggle = document.getElementById('color-scheme-toggle');

    // Obtém o elemento do corpo
    var body = document.body;

    // Obtém o elemento da ficha
    var ficha = document.querySelector('.ficha');

    // Alterna entre os esquemas de cores claro e escuro
    if (toggle.checked) {
        body.classList.add('dark');
        ficha.classList.add('dark'); // Aplica a classe 'dark' à ficha
        body.classList.remove('light');
        ficha.classList.remove('light'); // Remove a classe 'light' da ficha
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
        ficha.classList.add('light'); // Aplica a classe 'light' à ficha
        ficha.classList.remove('dark'); // Remove a classe 'dark' da ficha
    }
}