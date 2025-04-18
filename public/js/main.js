// Inicializa a conexão com o socket
var socket = io('/');
var author = ''; // Nome e informação do usuário

// Carrega o autor do localStorage ao entrar no chat
function loadAuthor() {
    author = localStorage.getItem('user') || '';
}

// Lógica para entrada no chat
function enterChat() {
    const userType = document.getElementById("user-type").value; // Captura o tipo de usuário
    const name = document.getElementById("name").value.trim(); // Captura o nome
    const extraInfo = document.getElementById("extra-info").value.trim(); // Captura o campo Bairro/Profissão

    // Valida os campos obrigatórios
    if (!userType || name.length < 4) {
        alert("Por favor, preencha o campo Nome e escolha um tipo de usuário.");
        return;
    }

    if (!extraInfo) {
        alert(`Por favor, preencha o campo ${userType === "Cliente" ? "Bairro" : "Profissão"}.`);
        return;
    }

    // Formata o autor conforme o tipo de usuário
    author = `${name} | ${extraInfo}`;
    localStorage.setItem('user', author); // Salva no armazenamento local

    // Esconde a tela inicial e exibe a tela do chat
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector(".container").style.display = "grid";

    loadAuthor(); // Carrega o autor
}

// Atualiza o estado do campo dinâmico
function showFields() {
    const userType = document.getElementById("user-type").value;
    const extraInfo = document.getElementById("extra-info");

    // Verifica qual opção foi selecionada e atualiza o estado do campo
    if (userType === "Cliente") {
        extraInfo.placeholder = "Bairro";
        extraInfo.readOnly = false; // Permite que o campo seja preenchido
    } else if (userType === "Profissional") {
        extraInfo.placeholder = "Profissão";
        extraInfo.readOnly = false; // Permite que o campo seja preenchido
    } else {
        extraInfo.placeholder = "Por favor, selecione para preencher.";
        extraInfo.readOnly = true; // Bloqueia o campo até que algo seja selecionado
    }
}

// Envia uma mensagem ao servidor
function Submit(event) {
    event.preventDefault(); // Impede recarregamento da página

    const message = document.querySelector('input[name=message]').value.trim();

    if (!message) {
        alert("Por favor, insira uma mensagem antes de enviar.");
        return;
    }

    const messageObject = {
        author, // Nome formatado
        message // Texto da mensagem
    };

    // Envia a mensagem ao servidor
    socket.emit('sendMessage', messageObject);

    // Limpa o campo de entrada após o envio
    document.querySelector('input[name=message]').value = '';
}

// Exibe mensagens recebidas no chat
socket.on('receivedMessage', function (message) {
    console.log("Mensagem recebida:", message); // Log para depuração
    renderMessage(message);
});

// Renderiza uma mensagem no chat
function renderMessage(message) {
    const messagesContainer = document.getElementById('messages');

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const authorElement = document.createElement('h2');
    authorElement.textContent = message.author;

    const messageTextElement = document.createElement('p');
    messageTextElement.textContent = message.message;

    messageElement.appendChild(authorElement);
    messageElement.appendChild(messageTextElement);
    messagesContainer.appendChild(messageElement);

    // Mantém o scroll no final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Exibe mensagens anteriores ao entrar no chat
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

// Inicializa contadores
let onlineCount = 0;
let messageCount = 0;

// Atualiza contadores no mobile
function updateCounters() {
    document.getElementById('online').textContent = `${onlineCount} Online`;
    document.getElementById('messages-received').textContent = `${messageCount} Mensagens`;
}

// Simula conexão de novos usuários
socket.on('ConnectionsInfo', function (info) {
    onlineCount = info.connections; // Atualiza número de usuários online
    updateCounters();
});

// Exibe número de mensagens enviadas/recebidas
socket.on('receivedMessage', function (message) {
    messageCount++; // Incrementa contador de mensagens
    renderMessage(message);
    updateCounters();
});