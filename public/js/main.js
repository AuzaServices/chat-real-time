var socket = io('/');
var info = {
    numberMessages: 0,
    connected: 0
};
var author = '';
var userType = '';

socket.on('receivedMessage', function (message) {
    renderMessage(message); // Renderiza mensagem recebida do servidor
});

socket.on('previousMessages', function (messages) {
    for (message of messages) {
        renderMessage(message); // Renderiza mensagens anteriores
    }
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', function (connectionsInfo) {
    info.connected = connectionsInfo.connections; // Atualiza número de conexões
    renderConnectionsInfo();
});

function getAuthor() {
    let user = localStorage.getItem('user');
    let type = localStorage.getItem('userType');
    if (user && type) {
        author = user;
        userType = type;
    } else {
        toggleBoxForNewUser('tog');
    }
}

function updateFields() {
    const userType = document.getElementById("user-type").value;
    const extraInfo = document.getElementById("extra-info");
    extraInfo.placeholder = userType === "Cliente" ? "Bairro" : "Profissão";
}

function submitLogin() {
    const userTypeField = document.getElementById("user-type").value;
    const name = document.getElementById("name").value;
    const extraInfo = document.getElementById("extra-info").value;

    if (!userTypeField || name.length < 4 || extraInfo.length < 2) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    localStorage.setItem("user", `${name} ${extraInfo}`);
    localStorage.setItem("userType", userTypeField);
    author = `${name} ${extraInfo}`;
    userType = userTypeField;

    document.getElementById("login-screen").classList.remove("active");
}

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

function renderMessage(message) {
    const format = userType === "Cliente" ? `${message.author} Bairro` : `${message.author} Profissão`;
    const messageTemplate = generateMessageTemplate({ message: message.message, author: format });

    const messagesContainer = document.querySelector(".messages");
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
    $('#input-message').val(''); // Limpa o campo de entrada

    if (message.length) {
        var messageObject = {
            author,
            message
        };

        // Envia a mensagem para o servidor
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