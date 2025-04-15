// Inicialização de variáveis e conexão com o servidor
var socket = io('https://chat-real-time-2.onrender.com/');
var info = {
    numberMessages: 0,
    connected: 0
};
var author = '';

// Manipula a seleção do tipo de usuário (Cliente ou Profissional)
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

    const messageContentElement = document.createElement('div');

    const authorInfoElement = document.createElement('h2');
    authorInfoElement.textContent = author;

    const messageTextElement = document.createElement('p');
    messageTextElement.setAttribute('aria-expanded', true);
    messageTextElement.textContent = message;

    messageContentElement.appendChild(authorInfoElement);
    messageContentElement.appendChild(messageTextElement);

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

        renderMessage(messageObject); // Renderiza no próprio dispositivo
        moveScroll();

        // Envia a mensagem ao servidor para ser transmitida a outros dispositivos
        socket.emit('sendMessage', messageObject);
    }
}

// Escutar mensagens recebidas de outros dispositivos
socket.on('receivedMessage', function(message) {
    renderMessage(message); // Renderiza mensagens recebidas no DOM
});

// Escutar mensagens anteriores ao entrar no chat
socket.on('previousMessages', function(messages) {
    for (message of messages) {
        renderMessage(message);
    }
    renderConnectionsInfo();
});

// Renderiza informações de conexões
function renderConnectionsInfo() {
    $('#online').html(`<h3><i class="fas fa-circle"></i> ${info.connected} Online</h3>`);
    $('#messages-received').html(`<h3 id="messages-received"><i class="fad fa-inbox-in"></i> ${info.numberMessages} ${info.numberMessages === 1 ? "Mensagem" : "Mensagens"}</h3>`);
}

// Inicializa o autor do chat
getAuthor();

