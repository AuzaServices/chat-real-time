const socket = io('/');
const info = {
    numberMessages: 0,
    connected: 0
};
let author = '';

// Eventos do Socket.io
socket.on('receivedMessage', function (message) {
    renderMessage(message);
});

socket.on('previousMessages', function (messages) {
    for (const message of messages) {
        renderMessage(message);
    }
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', function (connectionsInfo) {
    info.connected = connectionsInfo.connections._connections;
    renderConnectionsInfo();
});

// Inicializa o autor ao carregar
getAuthor();

function getAuthor() {
    const user = localStorage.getItem('user');

    if (user) {
        author = user;
    } else {
        toggleBoxForNewUser('tog');
    }
}

function generateMessageTemplate({ message, author, time }) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Imagem do usuário
    const userImageElement = document.createElement('div');
    userImageElement.classList.add('user-image');
    const userIconElement = document.createElement('i');
    userIconElement.classList.add('fal', 'fa-user-circle');
    userImageElement.appendChild(userIconElement);

    // Conteúdo da mensagem
    const messageContentElement = document.createElement('div');
    const authorInfoElement = document.createElement('h2');
    authorInfoElement.textContent = author;

    const messageTimeElement = document.createElement('span');
    messageTimeElement.textContent = time;
    authorInfoElement.appendChild(messageTimeElement);

    const messageTextElement = document.createElement('p');
    messageTextElement.setAttribute('aria-expanded', true);
    messageTextElement.textContent = message;

    messageContentElement.appendChild(authorInfoElement);
    messageContentElement.appendChild(messageTextElement);

    messageElement.appendChild(userImageElement);
    messageElement.appendChild(messageContentElement);

    return messageElement;
}

function renderMessage(message) {
    const messagesContainer = document.querySelector('.messages');
    const messageTemplate = generateMessageTemplate(message);

    messagesContainer.appendChild(messageTemplate);

    info.numberMessages += 1;
    moveScroll();
    renderConnectionsInfo();
}

function renderConnectionsInfo() {
    document.getElementById('online').innerHTML = `<h3><i class="fas fa-circle"></i> ${info.connected} Online</h3>`;
    document.getElementById('messages-received').innerHTML = `<h3 id="messages-received"><i class="fad fa-inbox-in"></i> ${info.numberMessages} ${info.numberMessages === 1 ? "Mensagem" : "Mensagens"}</h3>`;
}

function toggleBoxForNewUser(action) {
    const inputBox = document.getElementById('enter-user');

    if (action === 'tog') {
        inputBox.classList.toggle('active');
        inputBox.focus();
    } else if (action === 'get') {
        const newUser = document.getElementById('input-user').value;

        if (newUser.length < 4) {
            alert('Erro ao cadastrar usuário, tente um nome mais longo.');
            return;
        }

        localStorage.setItem('user', newUser);
        author = newUser;
        toggleBoxForNewUser('tog');
    }
}

function moveScroll() {
    const objDiv = document.getElementById('messages');
    objDiv.scrollTop = objDiv.scrollHeight;
}

function Submit(event) {
    event.preventDefault();
    getAuthor();

    const messageInput = document.querySelector('input[name=message]');
    const message = messageInput.value.trim();
    messageInput.value = '';

    // Validação de números de telefone
    const phoneNumberPattern = /\(?\d{2}\)?\d{4,5}-?\d{4}|\d{4,5}-?\d{4}/g;

    if (phoneNumberPattern.test(message)) {
        alert('Mensagens contendo números de telefone não são permitidas.');
        return;
    }

    if (message.length > 0) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'pm' : 'am';
        const time = `${hours % 12 || 12}:${minutes}${period}`;

        const messageObject = {
            author,
            message,
            time,
        };

        renderMessage(messageObject);
        moveScroll();

        socket.emit('sendMessage', messageObject);
    }
}

function handleToggleLeftBar() {
    const bar = document.querySelector('#left-bar');
    const chat = document.querySelector('#chat-area');
    const icon = document.querySelector('#toggleInfo');

    bar.classList.toggle('active');
    chat.classList.toggle('active');
    icon.className = icon.className === 'fal fa-info-circle' ? 'fal fa-times' : 'fal fa-info-circle';
}