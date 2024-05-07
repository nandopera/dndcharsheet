document.addEventListener('DOMContentLoaded', function () {
    let toggle = document.getElementById('color-scheme-toggle');
    let esquema = localStorage.getItem('esquema-de-cores');
    if (esquema === 'dark') {
        toggle.checked = true;
        alternarEsquemaCores();
    } else {
        toggle.checked = false;
        alternarEsquemaCores();
    }
});

function alternarEsquemaCores() {
    let toggle = document.getElementById('color-scheme-toggle'); // O checkbox
    let body = document.body; // O corpo do documento
    let ficha = document.querySelector('.ficha'); // A ficha
    let label = document.querySelector('.fichaStatus label'); // O label do checkbox

    if (toggle.checked) {
        body.classList.remove('light');
        body.classList.add('dark');
        ficha.classList.remove('light');
        ficha.classList.add('dark');
        toggle.className = 'color-scheme-toggle dark'; // Define a classe correspondente ao ícone
        label.textContent = 'Modo escuro'; // Atualiza o texto do label
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        ficha.classList.remove('dark');
        ficha.classList.add('light');
        toggle.className = 'color-scheme-toggle light'; // Define a classe correspondente ao ícone
        label.textContent = 'Modo claro'; // Atualiza o texto do label
    }
    localStorage.setItem('esquema-de-cores', toggle.checked ? 'dark' : 'light');
}

// Adiciona um evento de carregamento da página para definir o esquema de cores inicial
document.addEventListener('DOMContentLoaded', function () {
    let toggle = document.getElementById('color-scheme-toggle');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggle.checked = true;
        alternarEsquemaCores();
    } else {
        toggle.checked = false;
        alternarEsquemaCores();
    }
});
