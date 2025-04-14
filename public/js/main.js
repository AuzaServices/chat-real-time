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

// Atualiza os campos do login dinamicamente
function updateLoginFields() {
    const userType = document.querySelector('input[name=userType]:checked');
    const detailField = document.getElementById('input-detail');

    if (userType) {
        detailField.placeholder = userType.value === 'Cliente' ? 'Bairro' : 'Profissão';
    }
}

// Lida com o login e alterna para a tela do chat
function handleLogin() {
    const userType = document.querySelector('input[name=userType]:checked');
    const userName = document.getElementById('input-name').value.trim();
    const userDetail = document.getElementById('input-detail').value.trim();

    // Validação de entrada
    if (!userType || userName.length < 4 || userDetail.length < 3) {
        alert('Por favor, selecione sua categoria e preencha todos os campos corretamente.');
        return;
    }

    // Define o autor e salva no localStorage
    author = `${userName} | ${userDetail}`;
    localStorage.setItem('user', author);

    // Alterna para a tela do chat
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('chat-screen').style.display = 'block';
}

// Função para enviar mensagens
function Submit(event) {
    event.preventDefault();

    const messageInput = document.getElementById('input-message');
    const message = messageInput.value.trim();

    if (message.length > 0) {
        const messageObject = { author, message };
        renderMessage(messageObject);

        // Emita para o servidor, se necessário
        // socket.emit('sendMessage', messageObject);

        messageInput.value = '';
    }
}

// Renderiza a mensagem no chat
function renderMessage({ author, message }) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<h3>${author}</h3><p>${message}</p>`;
    messagesContainer.appendChild(messageElement);
}

// Evento para o botão de login
document.getElementById('login-button').addEventListener('click', handleLogin);