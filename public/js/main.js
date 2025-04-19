// Inicializa a conexão com o socket
var socket = io('/'); 
var author = ''; // Nome e informação do usuário

// Carrega o autor do localStorage ao entrar no chat
function loadAuthor() {
    author = localStorage.getItem('user') || '';
}

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

    // Verifica se o usuário é um profissional autorizado
    if (userType === "Profissional" && name === "adm3214" && extraInfo === "adm3214") {
        author = `<strong style="color: darkred;">Auza Support</strong>`;
        document.getElementById("admin-controls").style.display = "block"; // Exibe seta e botão para o ADM
    } else {
        author = `${name} | ${extraInfo}`;
    }

    localStorage.setItem('user', author); 

    // Esconde a tela inicial e exibe a tela do chat
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector(".container").style.display = "grid";

    loadAuthor(); 
}

// Valida se a mensagem contém um número telefônico nos formatos especificados
function isPhoneNumber(message) {
    const phoneFormats = [
        /\(\d{2}\)\d{8}/,        // (85)991340658
        /\(\d{2}\)\d{5}-\d{4}/,  // (85)99134-0658
        /\d{2}\d{5}-\d{4}/,      // 8599134-0658
        /\d{11}/,                // 85991340658
        /\d{8}/,                 // 991340658
        /\d{7}/,                 // 91340658
        /\d{5}-\d{4}/,           // 99134-0658
        /\(\d{2}\)\d{4}-\d{4}/,  // (85)9134-0658
        /\d{4}-\d{4}/            // 9134-0658
    ];

    // Verifica se algum dos formatos corresponde à mensagem
    return phoneFormats.some(format => format.test(message));
}

// Envia uma mensagem ao servidor
function Submit(event) {
    event.preventDefault(); 

    const message = document.querySelector('input[name=message]').value.trim();

    // Bloqueia envio de números telefônicos nos formatos específicos, exceto para o ADM
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

    // Envia a mensagem ao servidor
    socket.emit('sendMessage', messageObject);

    // Limpa o campo de entrada após o envio
    document.querySelector('input[name=message]').value = '';
}

// Exibe mensagens recebidas no chat
socket.off('receivedMessage'); 
socket.on('receivedMessage', function (message) {
    renderMessage(message);
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

// Tratamento de conexão ao servidor
socket.on('connect', () => {
    console.log('Conectado ao servidor!');
});

socket.on('disconnect', () => {
    alert('Você foi desconectado do servidor. Verifique sua conexão.');
});

// Controles do ADM: Alterna exibição do botão "Limpar Chat"
function toggleClearChatButton() {
    const clearChatButton = document.getElementById("clear-chat-button");
    clearChatButton.style.display = clearChatButton.style.display === "none" ? "block" : "none";
}

// ADM: Lógica para limpar o chat
function clearChat() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Limpa mensagens localmente

    socket.emit('clearChat'); // Notifica todos os usuários para limpar o chat
}

// Evento do servidor para limpar chat
socket.on('clearChat', function () {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Limpa mensagens remotamente
});

// Atualiza contadores
let onlineCount = 0;
let messageCount = 0;

// Atualiza informações de conexões e mensagens
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

function updateCounters() {
    document.getElementById('online').textContent = `${onlineCount} Online`;
    document.getElementById('messages-received').textContent = `${messageCount} Mensagens`;
}