// Inicializa a conexão com o socket
var socket = io('/');
var author = ''; // Nome do usuário
var inactivityTimer = null; // Timer para inatividade
var inactivityTimeLimit = 10 * 60 * 1000; // 10 minutos em milissegundos

// Exibe os campos extras dinamicamente
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

// Entrada no chat
function enterChat() {
    const userType = document.getElementById("user-type").value;
    const name = document.getElementById("name").value.trim();
    const extraInfo = document.getElementById("extra-info").value.trim();

    // Valida os campos
    if (!userType || name.length < 4 || !extraInfo) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Define o autor
    author = userType === "Profissional" ? `${name} | ${extraInfo}` : `${name} | ${extraInfo}`;

    // Esconde a tela inicial e exibe o chat
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector(".container").style.display = "block";

    // Salva o nome no armazenamento local
    localStorage.setItem('user', author);

    // Reinicia o timer de inatividade ao entrar no chat
    resetInactivityTimer();
}

// Envia uma mensagem ao servidor
function Submit(event) {
    event.preventDefault();

    const message = document.querySelector('input[name=message]').value.trim();

    if (!message) return; // Impede envio de mensagens vazias

    const messageObject = {
        author,
        message
    };

    // Envia a mensagem ao servidor
    socket.emit('sendMessage', messageObject);

    // Limpa o campo de entrada
    document.querySelector('input[name=message]').value = '';

    // Reinicia o timer de inatividade
    resetInactivityTimer();
}

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

    // Mantém o scroll no final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Exibe mensagens anteriores ao entrar no chat
socket.off('previousMessages');
socket.on('previousMessages', function (messages) {
    messages.forEach((message) => {
        renderMessage(message);
    });
});

// Recebe uma nova mensagem do servidor
socket.off('receivedMessage');
socket.on('receivedMessage', function (message) {
    renderMessage(message);

    // Reinicia o timer de inatividade ao receber uma mensagem
    resetInactivityTimer();
});

// Timer de inatividade: Reinicia o timer
function resetInactivityTimer() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer); // Limpa o timer atual
    }

    // Inicia um novo timer para limpar o chat após 10 minutos de inatividade
    inactivityTimer = setTimeout(() => {
        clearChat(); // Limpa o chat automaticamente
    }, inactivityTimeLimit);
}

// Função para limpar o chat
function clearChat() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Limpa localmente
    socket.emit('clearChat'); // Notifica todos os usuários para limpar o chat
}

// Evento do servidor para limpar o chat
socket.on('clearChat', function () {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Limpa remotamente
});

// Adiciona listeners para reiniciar o timer em interações no chat
function setupInactivityListener() {
    const inputField = document.getElementById('input-message');
    const sendButton = document.querySelector('.fa-paper-plane');
    const messagesContainer = document.getElementById('messages');

    // Reinicia o timer ao digitar no campo de mensagem
    inputField.addEventListener('input', resetInactivityTimer);

    // Reinicia o timer ao clicar no botão de enviar
    sendButton.addEventListener('click', resetInactivityTimer);

    // Reinicia o timer ao rolar o container de mensagens
    messagesContainer.addEventListener('scroll', resetInactivityTimer);
}

// Configura os listeners de inatividade ao carregar a página
window.onload = function () {
    setupInactivityListener();
    resetInactivityTimer(); // Inicia o timer pela primeira vez
};