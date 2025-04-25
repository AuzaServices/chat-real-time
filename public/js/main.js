// Inicializa a conexão com o socket
var socket = io('/');
var author = ''; // Nome e informação do usuário
var inactivityTimer = null; // Timer para inatividade
var inactivityTimeLimit = 20 * 60 * 1000; // 20 minutos em milissegundos

// Exibe o alerta de entrada ao usuário
function showEntryAlert() {
    const alertBox = document.getElementById('entry-alert');
    alertBox.style.opacity = "1"; // Exibe o alerta suavemente

    setTimeout(() => {
        alertBox.style.opacity = "0"; // Esconde suavemente após 6 segundos
    }, 6000);
}

// Atualiza o estado do campo dinâmico
function showFields() {
    const userType = document.getElementById("user-type").value;
    const extraInfo = document.getElementById("extra-info");

    if (userType === "Cliente") {
        extraInfo.placeholder = "Bairro";
        extraInfo.readOnly = false;
    } else if (userType === "Profissional") {
        extraInfo.placeholder = "Profissão";
        extraInfo.readOnly = false;
    } else {
        extraInfo.placeholder = "Por favor, selecione para preencher.";
        extraInfo.readOnly = true;
    }
}

// Lógica para entrada no chat
function enterChat() {
    const userType = document.getElementById("user-type").value;
    const name = document.getElementById("name").value.trim();
    const extraInfo = document.getElementById("extra-info").value.trim();

    if (!userType || name.length < 4) {
        alert("Por favor, preencha o campo Nome e escolha um tipo de usuário.");
        return;
    }

    if (!extraInfo) {
        alert(`Por favor, preencha o campo ${userType === "Cliente" ? "Bairro" : "Profissão"}.`);
        return;
    }

    if (userType === "Profissional" && name === "Limpar" && extraInfo === "Limpar") {
        clearChat();
        return;
    }

    if (userType === "Profissional" && name === "adm3214" && extraInfo === "adm3214") {
        author = `<strong style="color: darkred;">Auza Support</strong>`;
    } else {
        author = `${name} | ${extraInfo}`;
    }

    localStorage.setItem('user', author);
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector(".container").style.display = "grid";

    // Esconde o rodapé ao entrar no chat
    document.body.classList.add('chat-active'); 

    showEntryAlert(); // Exibe o alerta de entrada
    loadAuthor();
    resetInactivityTimer();
}

// Função para limpar o chat globalmente
function clearChat() {
    localStorage.clear();
    document.getElementById("welcome-screen").style.display = "grid";
    document.querySelector(".container").style.display = "none";
    document.body.classList.remove('chat-active'); // Restaura o rodapé
}

// Carrega o autor do localStorage ao entrar no chat
function loadAuthor() {
    author = localStorage.getItem('user') || '';
}

// Valida se a mensagem contém um número telefônico nos formatos especificados
function isPhoneNumber(message) {
    const phoneFormats = [
        /\(\d{2}\)\d{8}/,
        /\(\d{2}\)\d{5}-\d{4}/,
        /\d{2}\d{5}-\d{4}/,
        /\d{11}/,
        /\d{8}/,
        /\d{7}/,
        /\d{5}-\d{4}/,
        /\(\d{2}\)\d{4}-\d{4}/,
        /\d{4}-\d{4}/
    ];

    return phoneFormats.some(format => format.test(message));
}

// Envia uma mensagem ao servidor
function Submit(event) {
    event.preventDefault();

    const message = document.querySelector('input[name=message]').value.trim();

    if (!message) {
        alert("Por favor, escreva uma mensagem antes de enviar.");
        return;
    }

    if (isPhoneNumber(message) && author !== '<strong style="color: darkred;">Auza Support</strong>') {
        alert("Você não tem permissão para enviar números telefônicos.");
        return;
    }

    const messageObject = {
        author,
        message
    };

    socket.emit('sendMessage', messageObject);
    document.querySelector('input[name=message]').value = '';

    resetInactivityTimer();
}

// Exibe mensagens recebidas no chat
socket.off('receivedMessage');
socket.on('receivedMessage', function (message) {
    renderMessage(message);
    resetInactivityTimer();
});

// Renderiza uma mensagem no chat
function renderMessage(message) {
    const messagesContainer = document.getElementById('messages');

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const authorElement = document.createElement('h2');
    authorElement.innerHTML = message.author;

    const messageTextElement = document.createElement('p');
    messageTextElement.textContent = message.message;

    messageElement.appendChild(authorElement);
    messageElement.appendChild(messageTextElement);
    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Exibe mensagens anteriores ao entrar no chat
socket.off('previousMessages');
socket.on('previousMessages', function (messages) {
    messages.forEach((message) => {
        renderMessage(message);
    });
});

// Tratamento de conexão ao servidor
socket.on('connect', () => {
    console.log('Conectado ao servidor!');
});

socket.on('disconnect', () => {});

// Inicializa contadores
let onlineCount = 0;
let messageCount = 0;

// Atualiza contadores no mobile
function updateCounters() {
    document.getElementById('online').textContent = `${onlineCount} Online`;
    document.getElementById('messages-received').textContent = `${messageCount} Mensagens`;
}

// Simula conexão de novos usuários
socket.off('ConnectionsInfo');
socket.on('ConnectionsInfo', function (info) {
    onlineCount = info.connections;
    updateCounters();
});

// Exibe número de mensagens enviadas/recebidas
socket.off('receivedMessage');
socket.on('receivedMessage', function (message) {
    messageCount++;
    renderMessage(message);
    updateCounters();
});

// Monitoramento de inatividade
function resetInactivityTimer() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(() => {
        clearChat();
    }, inactivityTimeLimit);
}

// Evento do servidor para limpar o chat
socket.on('clearChat', function () {
    document.getElementById('messages').innerHTML = '';
});
