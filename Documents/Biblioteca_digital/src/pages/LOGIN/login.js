// 1. Lógica do Olhinho (Mostrar/Ocultar Senha)
const btnMostrarSenha = document.getElementById('btnMostrarSenha');
const inputSenha = document.getElementById('senha');
const iconeOlho = document.getElementById('iconeOlho');

btnMostrarSenha.addEventListener('click', () => {
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text'; // Mostra a senha
        // Desenha o olhinho riscado (eye-off)
        iconeOlho.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    } else {
        inputSenha.type = 'password'; // Oculta a senha
        // Desenha o olhinho normal (eye)
        iconeOlho.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
});

// 2. Lógica do Modal "Esqueci a Senha"
const modalEsqueci = document.getElementById('modalEsqueciSenha');
const linkEsqueci = document.getElementById('linkEsqueciSenha');
const fecharModal = document.getElementById('fecharModalEsqueci');
const formRecuperar = document.getElementById('formRecuperarSenha');

// Abrir modal
linkEsqueci.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que a página role para o topo
    modalEsqueci.style.display = 'flex';
});

// Fechar modal no 'X'
fecharModal.addEventListener('click', () => {
    modalEsqueci.style.display = 'none';
});

// Fechar modal clicando fora da caixa
window.addEventListener('click', (e) => {
    if (e.target === modalEsqueci) {
        modalEsqueci.style.display = 'none';
    }
});

// Enviar o formulário de recuperação
formRecuperar.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Sucesso! Se este e-mail estiver registado, receberá um link de recuperação em breve.');
    modalEsqueci.style.display = 'none'; // Fecha o modal
    formRecuperar.reset(); // Limpa o campo
});