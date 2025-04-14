var socket = io('/');
var info = {
    numberMessages: 0,
    connected: 0
};
var author = '';

socket.on('receivedMessage', function(message) {
    renderMessage(message);
});

socket.on('previousMessages', function(messages) {
    for (message of messages) {
        renderMessage(message);
    };
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', function(connectionsInfo) {
    info.connected = connectionsInfo.connections._connections;
    renderConnectionsInfo();
});

getAuthor();

function getAuthor() {
    let user = localStorage.getItem('user');

    if (user) {
        author = user;
    } else if (!user) {
        toggleBoxForNewUser('tog');
    }
}

function generateMessageTemplate({ message, author }) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const userImageElement = document.createElement('div');
    userImageElement.classList.add('user-image');

    const userIconElement = document.createElement('i');
    userIconElement.classList.add('fal', 'fa-user-circle');
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

function renderMessage(message) {
    const messagesContainer = document.querySelector('.messages');
    const messageTemplate = generateMessageTemplate(message);

    messagesContainer.appendChild(messageTemplate);

    info.numberMessages += 1;
    moveScroll();
    renderConnectionsInfo();
}

function renderConnectionsInfo() {
    $('#online').html(`<h3><i class="fas fa-circle"></i> ${info.connected} Online</h3>`);
    $('#messages-received').html(`<h3 id="messages-received"><i class="fad fa-inbox-in"></i> ${info.numberMessages} ${info.numberMessages === 1 ? "Mensagem" : "Mensagens"}</h3>`);
}

function toggleBoxForNewUser(met) {
    if (met === 'tog') {
        let input = document.getElementById('enter-user');
        input.classList.toggle('active');
        input.focus();
    }
    if (met === 'get') {
        let newUser = document.getElementById('input-user').value;

        if (newUser.length < 4) {
            alert('Erro ao cadastrar usuário, tente um nome mais longo.');
            return null;
        }
        
        localStorage.setItem('user', newUser);
        author = newUser;
        toggleBoxForNewUser('tog');
    }
}

function moveScroll() {
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function Submit(event) {
    event.preventDefault();

    getAuthor();

    var message = document.querySelector('input[name=message]').value;
    $('#input-message').val('');

    if (message.length) {
        var messageObject = {
            author,
            message,
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
let author = '';

// Função para alternar os campos da tela de login
function updateLoginFields() {
    const userType = document.querySelector('input[name=userType]:checked');
    const detailField = document.getElementById('input-detail');

    if (userType && userType.value === 'Cliente') {
        detailField.placeholder = 'Bairro';
    } else if (userType && userType.value === 'Profissional') {
        detailField.placeholder = 'Profissão';
    }
}

// Função para lidar com o login
function handleLogin() {
    const userType = document.querySelector('input[name=userType]:checked');
    const userName = document.getElementById('input-name').value;
    const userDetail = document.getElementById('input-detail').value;

    if (!userType || userName.trim().length < 4 || userDetail.trim().length < 3) {
        alert('Por favor, selecione sua categoria e preencha todos os campos corretamente.');
        return;
    }

    // Formata o autor com base no tipo selecionado
    author = userType.value === 'Cliente'
        ? `${userName} | ${userDetail}`
        : `${userName} | ${userDetail}`;

    // Salva o autor no localStorage
    localStorage.setItem('user', author);

    // Alterna para a tela do chat
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('chat-screen').classList.remove('hidden');
}

// Adiciona o evento ao botão de login
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-button').addEventListener('click', handleLogin);
});

// Função para enviar mensagem
function Submit(event) {
    event.preventDefault();

    const message = document.querySelector('input[name=message]').value;
    document.getElementById('input-message').value = '';

    if (message.trim().length) {
        const messageObject = {
            author,
            message,
        };

        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
    }
}

// Função para renderizar mensagem
function renderMessage(message) {
    const messagesContainer = document.querySelector('.messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const messageContent = `<h2>${message.author}</h2><p>${message.message}</p>`;
    messageElement.innerHTML = messageContent;

    messagesContainer.appendChild(messageElement);
}