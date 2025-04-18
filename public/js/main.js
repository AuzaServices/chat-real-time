var socket = io('/');
var info = {
    numberMessages: 0,
    connected: 0
};
var author = '';

socket.on('receivedMessage', function (message) {
    renderMessage(message);
});

socket.on('previousMessages', function (messages) {
    for (message of messages) {
        renderMessage(message);
    }
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', function (connectionsInfo) {
    info.connected = connectionsInfo.connections;
    renderConnectionsInfo();
});

// Função para o usuário entrar no chat após digitar o nome
function enterChat() {
    const userName = document.getElementById('user-name').value;

    if (userName.length < 4) {
        alert('Por favor, insira um nome com pelo menos 4 caracteres.');
        return;
    }

    // Salva o nome no armazenamento local
    localStorage.setItem('user', userName);
    author = userName;

    // Esconde a tela de login e exibe o chat
    document.getElementById('login-screen').classList.remove('active');
    document.querySelector('.container').style.display = 'grid';
}

function renderMessage(message) {
    const messagesContainer = document.querySelector(".messages");
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

function moveScroll() {
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function Submit(event) {
    event.preventDefault();
    const message = document.querySelector('input[name=message]').value;
    $('#input-message').val(''); // Limpa o campo de entrada

    if (message.length) {
        const messageObject = {
            author,
            message
        };

        // Envia a mensagem para o servidor
        socket.emit('sendMessage', messageObject);
    }
}