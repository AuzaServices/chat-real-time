// Conexão com o servidor hospedado
var socket = io('https://chat-real-time-2.onrender.com/');
var author = '';

// Manipula a seleção do tipo de usuário (Cliente ou Profissional)
function handleUserTypeSelection(userType) {
    const inputsBox = document.getElementById('inputs-box');
    inputsBox.innerHTML = ''; // Limpa os campos anteriores

    if (userType === 'Cliente') {
        inputsBox.innerHTML = `
            <input type="text" id="input-name" placeholder="Nome" required minlength="4">
            <input type="text" id="input-bairro" placeholder="Bairro" required minlength="4">
        `;
    } else if (userType === 'Profissional') {
        inputsBox.innerHTML = `
            <input type="text" id="input-name" placeholder="Nome" required minlength="4">
            <input type="text" id="input-profissao" placeholder="Profissão" required minlength="4">
        `;
    }
}

// Submete informações do usuário e entra no chat
function submitUserInfo() {
    const name = document.getElementById('input-name').value;
    const bairroOrProfissao = document.getElementById('input-bairro') 
        ? document.getElementById('input-bairro').value 
        : document.getElementById('input-profissao').value;

    if (!name || !bairroOrProfissao || name.length < 4 || bairroOrProfissao.length < 4) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    author = `${name} | ${bairroOrProfissao}`;
    localStorage.setItem('user', author);

    // Alterna a tela para o chat
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('chat-screen').classList.remove('hidden');
}

// Renderiza mensagens no DOM
function renderMessage(message) {
    const messagesContainer = document.querySelector('.messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const authorElement = document.createElement('h2');
    authorElement.textContent = message.author;

    const textElement = document.createElement('p');
    textElement.textContent = message.message;

    messageElement.appendChild(authorElement);
    messageElement.appendChild(textElement);
    messagesContainer.appendChild(messageElement);

    // Rola automaticamente para a última mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Envia uma mensagem ao servidor
function Submit(event) {
    event.preventDefault();
    const inputMessage = document.getElementById('input-message');
    const message = inputMessage.value;

    if (message.trim()) {
        const messageObject = {
            author: author || 'Anônimo',
            message: message,
        };

        renderMessage(messageObject); // Renderiza localmente
        socket.emit('sendMessage', messageObject); // Envia ao servidor
        inputMessage.value = ''; // Limpa o campo de entrada
    }
}

// Recebe mensagens anteriores ao entrar no chat
socket.on('previousMessages', (messages) => {
    for (const message of messages) {
        renderMessage(message); // Renderiza mensagens anteriores no DOM
    }
});

// Recebe novas mensagens enviadas por outros usuários
socket.on('receivedMessage', (message) => {
    renderMessage(message); // Renderiza a mensagem recebida
});