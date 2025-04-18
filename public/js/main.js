var socket = io('/');
var info = {
    numberMessages: 0,
    connected: 0
};
var author = '';

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

// Mostra os campos de acordo com o tipo de usuário
function showFields() {
    const userType = document.getElementById("user-type").value;
    const extraInfo = document.getElementById("extra-info");

    if (userType === "Cliente") {
        extraInfo.placeholder = "Bairro";
    } else if (userType === "Profissional") {
        extraInfo.placeholder = "Profissão";
    } else {
        extraInfo.placeholder = "";
    }
}

// Entra no chat com os dados preenchidos
function enterChat() {
    const userType = document.getElementById("user-type").value;
    const name = document.getElementById("name").value;
    const extraInfo = document.getElementById("extra-info").value;

    if (!userType || name.length < 4 || extraInfo.length < 2) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Formata o nome conforme o tipo de usuário
    author = `${name} | ${extraInfo}`;
    localStorage.setItem("user", author);

    // Esconde a tela inicial e exibe o chat
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector(".container").style.display = "grid";
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