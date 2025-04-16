const socket = io('/'); // Inicializa conexão com Socket.io
const info = {
    numberMessages: 0,
    connected: 0
};
let author = '';

// Eventos do Socket.io
socket.on('receivedMessage', (message) => {
    renderMessage(message);
});

socket.on('previousMessages', (messages) => {
    messages.forEach((message) => renderMessage(message));
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', (connectionsInfo) => {
    info.connected = connectionsInfo.connections._connections;
    renderConnectionsInfo();
});

socket.on('clearMessages', () => {
    clearMessagesLocally();
});

// Obtém informações do autor ao carregar
getAuthor();

function handleUserTypeChange() {
    const userType = document.getElementById('user-type').value;
    const clienteInfo = document.getElementById('cliente-info');
    const profissionalInfo = document.getElementById('profissional-info');

    clienteInfo.style.display = userType === 'Cliente' ? 'block' : 'none';
    profissionalInfo.style.display = userType === 'Profissional' ? 'block' : 'none';
}

function getAuthor() {
    const user = localStorage.getItem('user');

    if (user) {
        const userObj = JSON.parse(user);

        if (userObj.userType === 'Profissional' && userObj.name === 'adm3214' && userObj.profissao === 'adm3214') {
            author = 'Auza Services';
            document.getElementById('clear-chat').style.display = 'block'; // Exibe o botão Limpar o Chat
        } else {
            author = `${userObj.name} | ${userObj.bairro || userObj.profissao}`;
        }
    } else {
        toggleBoxForNewUser('tog');
    }
}

function toggleBoxForNewUser(action) {
    const inputBox = document.getElementById('enter-user');

    if (action === 'tog') {
        inputBox.classList.toggle('active');
        inputBox.focus();
    } else if (action === 'get') {
        const userType = document.getElementById('user-type').value;

        if (!userType) {
            alert('Por favor, selecione um tipo de usuário.');
            return;
        }

        let name, bairro, profissao;

        if (userType === 'Cliente') {
            name = document.getElementById('input-nome-cliente').value;
            bairro = document.getElementById('input-bairro-cliente').value;

            if (name.length < 4 || bairro.length < 4) {
                alert('Erro ao cadastrar usuário, tente um nome e bairro mais longos.');
                return;
            }
        } else if (userType === 'Profissional') {
            name = document.getElementById('input-nome-profissional').value;
            profissao = document.getElementById('input-profissao').value;

            if (name.length < 4 || profissao.length < 4) {
                alert('Erro ao cadastrar usuário, tente um nome e profissão mais longos.');
                return;
            }
        }

        const user = { userType, name, bairro, profissao };

        if (userType === 'Profissional' && name === 'adm3214' && profissao === 'adm3214') {
            author = 'Auza Services';
            document.getElementById('clear-chat').style.display = 'block';
        } else {
            author = `${name} | ${bairro || profissao}`;
        }

        localStorage.setItem('user', JSON.stringify(user));
        toggleBoxForNewUser('tog');
    }
}

function generateMessageTemplate({ message, author, type, data }) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const userImageElement = document.createElement('div');
    userImageElement.classList.add('user-image');
    const userIconElement = document.createElement('i');
    userIconElement.classList.add('fal', 'fa-user-circle');
    userImageElement.appendChild(userIconElement);

    const messageContentElement = document.createElement('div');
    const authorInfoElement = document.createElement('div');
    authorInfoElement.classList.add('author-info');
    const authorNameElement = document.createElement('h2');
    authorNameElement.textContent = author;

    if (author === 'Auza Services') {
        authorNameElement.style.color = 'darkred';
        authorNameElement.style.fontWeight = 'bold';
    }

    authorInfoElement.appendChild(authorNameElement);
    messageContentElement.appendChild(authorInfoElement);

    if (type === 'image') {
        const imgElement = document.createElement('img');
        imgElement.src = data;
        imgElement.alt = 'Image';
        messageContentElement.appendChild(imgElement);
    } else if (type === 'video') {
        const videoElement = document.createElement('video');
        videoElement.src = data;
        videoElement.controls = true;
        messageContentElement.appendChild(videoElement);
    } else {
        const messageTextElement = document.createElement('p');
        messageTextElement.textContent = message;
        messageContentElement.appendChild(messageTextElement);
    }

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
    document.getElementById('messages-received').innerHTML = `<h3 id="messages-received"><i class="fad fa-inbox-in"></i> ${info.numberMessages} ${info.numberMessages === 1 ? 'Mensagem' : 'Mensagens'}</h3>`;
}

function moveScroll() {
    const objDiv = document.getElementById('messages');
    objDiv.scrollTop = objDiv.scrollHeight;
}

function Submit(event) {
    event.preventDefault();
    getAuthor();

    const messageInput = document.querySelector('input[name=message]');
    const message = messageInput.value;
    messageInput.value = '';

    const phoneNumberPattern = /\(?\d{2}\)?\d{4,5}-?\d{4}|\d{4,5}-?\d{4}/g;

    if (phoneNumberPattern.test(message)) {
        alert('Mensagens contendo números de telefone não são permitidas.');
        return;
    }

    if (message.length) {
        const messageObject = { author, message };
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

function clearMessagesLocally() {
    document.querySelector('.messages').innerHTML = '';
    info.numberMessages = 0;
    renderConnectionsInfo();
}

function clearChat() {
    clearMessagesLocally();
    socket.emit('clearMessages');
}

function endSession() {
    localStorage.clear();
    clearChat();
    alert('Suas mensagens serão apagadas e você retornará à tela de login.');
    window.location = '/';
}

window.addEventListener('beforeunload', (event) => {
    clearMessagesLocally();
    event.preventDefault();
    event.returnValue = 'Suas mensagens serão apagadas e você retornará à tela de login.';
});

window.addEventListener('unload', () => {
    endSession();
});