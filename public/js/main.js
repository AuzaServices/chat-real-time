// Informações iniciais
var socket = io('/');
var info = {
    numberMessages: 0,
    connected: 0
};
var author = '';

// Manipula a seleção do tipo de usuário (Cliente ou Profissional) e exibe os campos dinâmicos
function handleUserTypeSelection(userType) {
    const inputsBox = document.getElementById('inputs-box');
    inputsBox.innerHTML = ''; // Limpa os campos anteriores

    if (userType === 'Cliente') {
        inputsBox.innerHTML = `
            <input type="text" id="input-name" placeholder="Nome" required minlength="4">
            <input type="text" id="input-bairro" placeholder="Bairro" required minlength="4">
        `;
    } else if (userType === 'Profissional') {
        inputsBox.innerHTML = `
            <input type="text" id="input-name" placeholder="Nome" required minlength="4">
            <input type="text" id="input-profissao" placeholder="Profissão" required minlength="4">
        `;
    }
}

// Realiza a transição da tela de login para o chat após validação dos dados
function submitUserInfo() {
    const name = document.getElementById('input-name').value;
    const bairroOrProfissao = document.getElementById('input-bairro') 
        ? document.getElementById('input-bairro').value 
        : document.getElementById('input-profissao').value;

    // Validação de campos
    if (!name || name.length < 4 || !bairroOrProfissao || bairroOrProfissao.length < 4) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Formata o nome do usuário com base no tipo selecionado
    const formattedName = `${name} | ${bairroOrProfissao}`;
    localStorage.setItem('user', formattedName);
    author = formattedName;

    // Alterna as telas de login para chat
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('chat-screen').classList.add('active');
    document.getElementById('chat-screen').classList.remove('hidden');
}

// Exibe informações do usuário no chat
function getAuthor() {
    let user = localStorage.getItem('user');

    if (user) {
        author = user;
    }
}

// Renderiza mensagens no chat
function renderMessage(message) {
    const messagesContainer = document.querySelector('.messages');
    const messageTemplate = generateMessageTemplate(message);

    messagesContainer.appendChild(messageTemplate);

    info.numberMessages += 1;
    moveScroll();
    renderConnectionsInfo();
}

// Template para as mensagens
function generateMessageTemplate({ message, author }) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const userImageElement = document.createElement('div');
    userImageElement.classList.add('user-image');

    const userIconElement = document.createElement('i');
    userIconElement.classList.add('fal');
    userIconElement.classList.add('fa-user-circle');

    userImageElement.appendChild(userIconElement);

    const messageContentElement = document.createElement('div');

    const authorInfoElement = document.createElement('h2');
    authorInfoElement.textContent = author;

    const messageTextElement = document.createElement('p');
    messageTextElement.setAttribute('aria-expanded', true);
    messageTextElement.textContent = message;

    messageContentElement.appendChild(authorInfoElement);
    messageContentElement.appendChild(messageTextElement);

    messageElement.appendChild(userImageElement);
    messageElement.appendChild(messageContentElement);

    return messageElement;
}

// Mantém o scroll no fim da área de mensagens
function moveScroll() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Envia uma nova mensagem ao chat
function Submit(event) {
    event.preventDefault();

    getAuthor();

    const messageInput = document.querySelector('input[name=message]');
    const message = messageInput.value;
    messageInput.value = '';

    if (message.length) {
        const messageObject = {
            author,
            message,
        };

        renderMessage(messageObject);
        moveScroll();

        socket.emit('sendMessage', messageObject);
    }
}

// Renderiza informações de conexões
function renderConnectionsInfo() {
    $('#online').html(`<h3><i class="fas fa-circle"></i> ${info.connected} Online</h3>`);
    $('#messages-received').html(`<h3 id="messages-received"><i class="fad fa-inbox-in"></i> ${info.numberMessages} ${info.numberMessages === 1 ? "Mensagem" : "Mensagens"}</h3>`);
}

// Alterna a barra lateral
function handleToggleLeftBar() {
    const bar = document.querySelector('#left-bar');
    const chat = document.querySelector('#chat-area');
    const icon = document.querySelector('#toggleInfo');

    bar.classList.toggle('active');
    chat.classList.toggle('active');

    icon.className = icon.className === 'fal fa-info-circle' ? 'fal fa-times' : 'fal fa-info-circle';
}

// Eventos do Socket.IO
socket.on('receivedMessage', function(message) {
    renderMessage(message);
});

socket.on('previousMessages', function(messages) {
    for (message of messages) {
        renderMessage(message);
    }
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', function(connectionsInfo) {
    info.connected = connectionsInfo.connections._connections;
    renderConnectionsInfo();
});

// Inicializa o autor
getAuthor();