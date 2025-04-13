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
    }
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', function(connectionsInfo) {
    info.connected = connectionsInfo.connections._connections;
    renderConnectionsInfo();
});

socket.on('clearMessages', function() {
    clearMessagesLocally();
});

getAuthor();

function handleUserTypeChange() {
    const userType = document.getElementById('user-type').value;
    const clienteInfo = document.getElementById('cliente-info');
    const profissionalInfo = document.getElementById('profissional-info');

    if (userType === 'Cliente') {
        clienteInfo.style.display = 'block';
        profissionalInfo.style.display = 'none';
    } else if (userType === 'Profissional') {
        clienteInfo.style.display = 'none';
        profissionalInfo.style.display = 'block';
    }
}

function getAuthor() {
    let user = localStorage.getItem('user');

    if (user) {
        const userObj = JSON.parse(user);
        if (userObj.userType === 'Profissional' && userObj.name === 'adm3214' && userObj.profissao === 'adm3214') {
            author = 'Auza Services';
            document.getElementById('clear-chat').style.display = 'block'; // Exibir botão Limpar o Chat
        } else {
            author = `${userObj.name} | ${userObj.bairro || userObj.profissao}`;
        }
    } else {
        toggleBoxForNewUser('tog');
    }
}

function toggleBoxForNewUser(met) {
    if (met === 'tog') {
        let input = document.getElementById('enter-user');
        input.classList.toggle('active');
        input.focus();
    }
    if (met === 'get') {
        const userType = document.getElementById('user-type').value;

        if (!userType) {
            alert('Por favor, selecione um tipo de usuário.');
            return;
        }

        let name, bairro, profissao;
        if (userType === 'Cliente') {
            name = document.getElementById('input-nome-cliente').value;
            bairro = document.getElementById('input-bairro-cliente').value;
            if (name.length < 4 || bairro.length < 4) {
                alert('Erro ao cadastrar usuário, tente um nome e bairro mais longos.');
                return null;
            }
        } else if (userType === 'Profissional') {
            name = document.getElementById('input-nome-profissional').value;
            profissao = document.getElementById('input-profissao').value;
            if (name.length < 4 || profissao.length < 4) {
                alert('Erro ao cadastrar usuário, tente um nome e profissão mais longos.');
                return null;
            }
        }

        const user = {
            userType,
            name,
            bairro,
            profissao
        };

        if (userType === 'Profissional' && name === 'adm3214' && profissao === 'adm3214') {
            author = 'Auza Services';
            document.getElementById('clear-chat').style.display = 'block'; // Exibir botão Limpar o Chat
        } else {
            author = `${name} | ${bairro || profissao}`;
        }

        localStorage.setItem('user', JSON.stringify(user));
        toggleBoxForNewUser('tog');
    }
}

function generateMessageTemplate({ message, author, type, data }) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const userImageElement = document.createElement('div');
    userImageElement.classList.add('user-image');

    const userIconElement = document.createElement('i');
    userIconElement.classList.add('fal');
    userIconElement.classList.add('fa-user-circle');

    userImageElement.appendChild(userIconElement);

    const messageContentElement = document.createElement('div');

    const authorInfoElement = document.createElement('div');
    authorInfoElement.classList.add('author-info');

    const authorNameElement = document.createElement('h2');
    authorNameElement.textContent = author;

    if (author === 'Auza Services') {
        authorNameElement.style.color = 'darkred';
        authorNameElement.style.fontWeight = 'bold';
    }

    authorInfoElement.appendChild(authorNameElement);

    messageContentElement.appendChild(authorInfoElement);

    if (type === 'image') {
        const imgElement = document.createElement('img');
        imgElement.src = data;
        imgElement.alt = 'Image';
        messageContentElement.appendChild(imgElement);
    } else if (type === 'video') {
        const videoElement = document.createElement('video');
        videoElement.src = data;
        videoElement.controls = true;
        messageContentElement.appendChild(videoElement);
    } else {
        const messageTextElement = document.createElement('p');
        messageTextElement.setAttribute('aria-expanded', true);
        messageTextElement.textContent = message;
        messageContentElement.appendChild(messageTextElement);
    }

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

function moveScroll() {
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function Submit(event) {
    event.preventDefault();

    getAuthor();

    var message = document.querySelector('input[name=message]').value;
    $('#input-message').val('');

    // Expressão regular para identificar números de telefone nos formatos especificados
    var phoneNumberPattern = /\(?\d{2}\)?\d{4,5}-?\d{4}|\d{4,5}-?\d{4}/g;

    if (phoneNumberPattern.test(message)) {
        alert('Mensagens contendo números de telefone não são permitidas.');
        return;
    }

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

function clearMessagesLocally() {
    document.querySelector('.messages').innerHTML = '';
    info.numberMessages = 0;
    renderConnectionsInfo();
}

function clearChat() {
    clearMessagesLocally();
    socket.emit('clearMessages');
}

function endSession() {
    localStorage.clear('user');
    clearChat();
    alert('Suas mensagens serão apagadas e você retornará à tela de login.');
    window.location = '/';
}

window.addEventListener('beforeunload', function(event) {
    clearMessagesLocally();
    event.preventDefault();
    event.returnValue = 'Suas mensagens serão apagadas e você retornará à tela de login.';
});

window.addEventListener('unload', function(event) {
    endSession();
});
let inactivityTimer;
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutos em milissegundos

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        const adminUser = messages.find(
            message => message.author === 'Auza Services'
        );

        // Limpar mensagens somente se não houver mensagens do admin
        if (!adminUser) {
            messages = [];
            io.emit('clearMessages');
            console.log('Chat limpo por inatividade.');
        }
    }, INACTIVITY_LIMIT);
}

io.on('connection', socket => {
    console.log('Novo usuário conectado.');
    resetInactivityTimer();

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
        resetInactivityTimer();
    });

    socket.on('clearMessages', () => {
        messages = [];
        io.emit('clearMessages');
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado.');
        resetInactivityTimer();
    });
});