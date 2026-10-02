// --- LÓGICA DO OLHINHO (MOSTRAR/OCULTAR SENHA) ---
function configurarOlhinho(btnId, inputId) {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    const icone = btn.querySelector('.iconeOlho');

    btn.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text'; // Mostra a senha
            icone.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            input.type = 'password'; // Oculta a senha
            icone.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    });
}

// Configura os dois botões
configurarOlhinho('btnMostrarSenha1', 'senha');
configurarOlhinho('btnMostrarSenha2', 'confirmar_senha');


// --- LÓGICA DO MODAL DE TERMOS ---
const modalTermos = document.getElementById('modalTermos');
const linkTermos = document.getElementById('linkTermos');
const fecharModalTermos = document.getElementById('fecharModalTermos');

linkTermos.addEventListener('click', (e) => {
    e.preventDefault();
    modalTermos.style.display = 'flex';
});

fecharModalTermos.addEventListener('click', () => {
    modalTermos.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalTermos) {
        modalTermos.style.display = 'none';
    }
});


// --- LÓGICA DE VALIDAÇÃO DE SENHA ---
const formCadastro = document.getElementById('formCadastro');
const inputSenha = document.getElementById('senha');
const inputConfirmarSenha = document.getElementById('confirmar_senha');
const erroSenha = document.getElementById('erroSenha');

formCadastro.addEventListener('submit', (e) => {
    const senha = inputSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;

    if (senha !== confirmarSenha) {
        // Impede o formulário de ser enviado
        e.preventDefault();
        
        // Aplica as classes de erro
        inputConfirmarSenha.classList.add('erro');
        erroSenha.style.display = 'block';
    } else {
        // Remove as classes de erro caso a pessoa tenha corrigido
        inputConfirmarSenha.classList.remove('erro');
        erroSenha.style.display = 'none';
    }
});

// Limpa o aviso de erro assim que o utilizador começar a escrever novamente
inputConfirmarSenha.addEventListener('input', () => {
    inputConfirmarSenha.classList.remove('erro');
    erroSenha.style.display = 'none';
});