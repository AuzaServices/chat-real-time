// Inicializa a conexão com o socket
var socket = io('/');
var author = ''; // Nome e informação do usuário
var inactivityTimer = null; // Timer para inatividade
var inactivityTimeLimit = 20 * 60 * 1000; // 15 minutos em milissegundos

// Atualiza o estado do campo dinâmico
function showFields() {
    const userType = document.getElementById("user-type").value;
    const extraInfo = document.getElementById("extra-info");

    // Verifica qual opção foi selecionada e atualiza o estado do campo
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

// Função para verificar se há mensagens no chat
function hasMessages() {
    const messagesContainer = document.getElementById('messages');
    return messagesContainer && messagesContainer.children.length > 0;
}

// Exibe mensagem no centro da tela com base no tipo de usuário, se não houver mensagens
function showWaitingMessage(userType) {
    if (hasMessages()) {
        // Não exibe o container vermelho se já houver mensagens
        return;
    }

    const messageBox = document.createElement("div");
    messageBox.id = "waiting-message";
    messageBox.style.position = "fixed";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.backgroundColor = "rgba(139, 0, 0, 0.7)"; // Cor darkred transparente
    messageBox.style.padding = "20px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.color = "#fff";
    messageBox.style.fontSize = "1.2rem";
    messageBox.style.textAlign = "center";
    messageBox.style.zIndex = "999";
    messageBox.style.transition = "opacity 0.5s ease"; // Transição suave
    messageBox.innerText = userType === "Cliente"
        ? "Aguarde enquanto o Profissional entra no Chat."
        : "Aguarde enquanto o Cliente entra no Chat.";

    document.body.appendChild(messageBox);
}

// Remove a mensagem vermelha
function removeWaitingMessage() {
    const messageBox = document.getElementById("waiting-message");
    if (messageBox) {
        messageBox.style.opacity = "0"; // Inicia a transição de desaparecimento
        setTimeout(() => {
            messageBox.remove(); // Remove o elemento após a transição
        }, 500); // Tempo da transição
    }
}

// Lógica para entrada no chat
function enterChat() {
    const userType = document.getElementById("user-type").value;
    const name = document.getElementById("name").value.trim();
    const extraInfo = document.getElementById("extra-info").value.trim();

    // Valida os campos obrigatórios
    if (!userType || name.length < 4) {
        alert("Por favor, preencha o campo Nome e escolha um tipo de usuário.");
        return;
    }

    if (!extraInfo) {
        alert(`Por favor, preencha o campo ${userType === "Cliente" ? "Bairro" : "Profissão"}.`);
        return;
    }

    // Exibe a mensagem de espera, se necessário
    showWaitingMessage(userType);

    // Salva o tipo de usuário no localStorage para reaparecimento do container
    localStorage.setItem('userType', userType);

    // Lógica para limpar o chat se as condições forem atendidas
    if (userType === "Profissional" && name === "Limpar" && extraInfo === "Limpar") {
        clearChat();
        return;
    }

    // Verifica se o usuário é um profissional autorizado
    if (userType === "Profissional" && name === "adm3214" && extraInfo === "adm3214") {
        author = `<strong style="color: darkred;">Auza Support</strong>`;
    } else {
        author = `${name} | ${extraInfo}`;
    }

    localStorage.setItem('user', author);

    // Esconde a tela inicial e exibe a tela do chat
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector(".container").style.display = "grid";

    loadAuthor();
    resetInactivityTimer();
}

// Função para limpar o chat globalmente
function clearChat() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    socket.emit('clearChat'); // Emite a limpeza para o servidor

    // Faz o container vermelho reaparecer após o chat ser limpo
    const userType = localStorage.getItem('userType'); // Recupera o tipo de usuário
    if (userType) {
        showWaitingMessage(userType); // Exibe a mensagem de espera novamente
    }
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

    // Remove a mensagem de espera localmente
    removeWaitingMessage();

    // Notifica todos os usuários para remover o container vermelho
    socket.emit('removeWaitingMessage');

    if (isPhoneNumber(message)) {
        if (author !== '<strong style="color: darkred;">Auza Support</strong>') {
            alert("Você não tem permissão para enviar números telefônicos.");
            return;
        }
    }

    const messageObject = {
        author,
        message
    };

    socket.emit('sendMessage', messageObject);

    document.querySelector('input[name=message]').value = '';
    resetInactivityTimer();
}

// Exibe mensagens recebidas no chat e remove o container vermelho
socket.off('receivedMessage');
socket.on('receivedMessage', function (message) {
    removeWaitingMessage(); // Remove o container vermelho localmente
    renderMessage(message);
    resetInactivityTimer();
});

// Escuta evento para remover o container vermelho remotamente
socket.on('removeWaitingMessage', function () {
    removeWaitingMessage(); // Remove o container vermelho para todos os usuários conectados
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
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Limpa todas as mensagens no cliente

    // Faz o container vermelho reaparecer após o chat ser limpo
    const userType = localStorage.getItem('userType'); // Recupera o tipo de usuário
    if (userType) {
        showWaitingMessage(userType); // Exibe a mensagem de espera novamente
    }
});