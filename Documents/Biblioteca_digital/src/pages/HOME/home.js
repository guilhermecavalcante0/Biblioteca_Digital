// --- ELEMENTOS GERAIS ---
const acervoLista = document.getElementById('acervoLista');
const mensagemVazio = document.getElementById('mensagemVazio');

// Elementos Modais CRUD
const modalAdd = document.getElementById('modalAdicionar');
const modalEdit = document.getElementById('modalEditar');
const formAdd = document.getElementById('formAdicionarObra');
const formEdit = document.getElementById('formEditarObra');
let livroSendoEditado = null;

// Elementos Modal Detalhes e Chat
const modalDetalhes = document.getElementById('modalDetalhes');
const chatInput = document.getElementById('chatInput');
const chatMensagens = document.getElementById('chatMensagens');

// --- FUNÇÕES DE ABRIR/FECHAR MODAIS ---
document.getElementById('btnAdicionarObra').addEventListener('click', () => modalAdd.style.display = 'flex');
document.getElementById('linkAddObra').addEventListener('click', (e) => {
    e.preventDefault();
    modalAdd.style.display = 'flex';
});

document.getElementById('fecharModalAdd').addEventListener('click', () => modalAdd.style.display = 'none');
document.getElementById('fecharModalEdit').addEventListener('click', () => modalEdit.style.display = 'none');
document.getElementById('fecharModalDetalhes').addEventListener('click', () => modalDetalhes.style.display = 'none');

window.addEventListener('click', (event) => {
    if (event.target === modalAdd) modalAdd.style.display = 'none';
    if (event.target === modalEdit) modalEdit.style.display = 'none';
    if (event.target === modalDetalhes) modalDetalhes.style.display = 'none';
});

function verificarAcervo() {
    mensagemVazio.style.display = acervoLista.children.length === 0 ? 'block' : 'none';
}

// --- ADICIONAR NOVA OBRA ---
formAdd.addEventListener('submit', (event) => {
    event.preventDefault();

    const titulo = document.getElementById('tituloObra').value;
    const autor = document.getElementById('autorObra').value;
    const capa = document.getElementById('capaObra').value;
    const local = document.getElementById('localObra').value;
    const contato = document.getElementById('contatoObra').value;

    const novoLivroHTML = `
        <div class="livro">
            <div class="capa"><img src="${capa}" alt="${titulo}" onerror="this.src='https://via.placeholder.com/300x400?text=Erro'"></div>
            <h3 class="livro-titulo">${titulo}</h3>
            <p class="livro-autor">${autor}</p>
            <span class="livro-local">📍 ${local}</span>
            <span class="livro-contato">📞 ${contato}</span>
            <button class="btn-ver-detalhes">Ver detalhes</button>
            <div class="acoes">
                <button class="btn-editar">Editar</button>
                <button class="btn-remover">Remover</button>
            </div>
        </div>
    `;

    acervoLista.insertAdjacentHTML('beforeend', novoLivroHTML);
    verificarAcervo();
    formAdd.reset();
    modalAdd.style.display = 'none';
});

// --- DELEGAÇÃO DE EVENTOS: CLICAR NOS BOTÕES DAS OBRAS ---
document.addEventListener('click', (event) => {
    const botaoClicado = event.target;
    
    if (botaoClicado.tagName !== 'BUTTON') return;

    const cartaoLivro = botaoClicado.closest('.livro');
    if (!cartaoLivro) return;

    // 1. Remover
    if (botaoClicado.classList.contains('btn-remover')) {
        if (confirm("Tem certeza que deseja remover esta obra do seu acervo?")) {
            cartaoLivro.remove();
            verificarAcervo();
        }
        return;
    }

    // 2. Editar
    if (botaoClicado.classList.contains('btn-editar')) {
        livroSendoEditado = cartaoLivro;
        document.getElementById('editTituloObra').value = cartaoLivro.querySelector('.livro-titulo').innerText;
        document.getElementById('editAutorObra').value = cartaoLivro.querySelector('.livro-autor').innerText;
        document.getElementById('editCapaObra').value = cartaoLivro.querySelector('.capa img').src;
        
        const spanLocal = cartaoLivro.querySelector('.livro-local');
        const spanContato = cartaoLivro.querySelector('.livro-contato');
        
        document.getElementById('editLocalObra').value = spanLocal ? spanLocal.innerText.replace('📍 ', '') : '';
        document.getElementById('editContatoObra').value = spanContato ? spanContato.innerText.replace('📞 ', '') : '';

        modalEdit.style.display = 'flex';
        return;
    }

    // 3. Ver Detalhes (Abre o chat)
    if (botaoClicado.innerText === 'Ver detalhes' || botaoClicado.classList.contains('btn-ver-detalhes')) {
        const titulo = cartaoLivro.querySelector('h3').innerText;
        const autor = cartaoLivro.querySelector('p').innerText;
        
        const spanLocal = cartaoLivro.querySelector('.livro-local');
        const spanContato = cartaoLivro.querySelector('.livro-contato');

        const local = spanLocal ? spanLocal.innerText.replace('📍 ', '') : 'Não informado';
        const contato = spanContato ? spanContato.innerText.replace('📞 ', '') : 'Anunciante local';

        document.getElementById('detalheTitulo').innerText = titulo;
        document.getElementById('detalheAutor').innerText = autor;
        document.getElementById('detalheLocal').innerText = local;
        document.getElementById('detalheContato').innerText = contato;

        chatMensagens.innerHTML = `
            <div class="mensagem recebida">
                Olá! Vi que tem interesse em "${titulo}". Como posso ajudar?
            </div>
        `;

        modalDetalhes.style.display = 'flex';
    }
});

// --- SALVAR ALTERAÇÕES DA EDIÇÃO ---
formEdit.addEventListener('submit', (event) => {
    event.preventDefault();
    if (livroSendoEditado) {
        livroSendoEditado.querySelector('.livro-titulo').innerText = document.getElementById('editTituloObra').value;
        livroSendoEditado.querySelector('.livro-autor').innerText = document.getElementById('editAutorObra').value;
        livroSendoEditado.querySelector('.capa img').src = document.getElementById('editCapaObra').value;
        
        let spanLocal = livroSendoEditado.querySelector('.livro-local');
        let spanContato = livroSendoEditado.querySelector('.livro-contato');
        
        if(spanLocal) spanLocal.innerText = '📍 ' + document.getElementById('editLocalObra').value;
        if(spanContato) spanContato.innerText = '📞 ' + document.getElementById('editContatoObra').value;
    }
    modalEdit.style.display = 'none';
    livroSendoEditado = null;
});

// --- LÓGICA DO CHAT ---
function enviarMensagem() {
    const texto = chatInput.value.trim();
    if (texto !== '') {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'mensagem enviada';
        msgDiv.innerText = texto;
        chatMensagens.appendChild(msgDiv);
        
        chatInput.value = '';
        chatMensagens.scrollTop = chatMensagens.scrollHeight;
    }
}

document.getElementById('btnEnviarMensagem').addEventListener('click', enviarMensagem);
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') enviarMensagem();
});