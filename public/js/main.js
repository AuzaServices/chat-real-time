var socket = io('/');
var info = {
    numberMessages: 0,
    connected: 0
};
var author = '';

socket.on('receivedMessage', function(message){
    renderMessage(message);
});

socket.on('previousMessages', function(messages){
    for (message of messages){
        renderMessage(message);
    };
    renderConnectionsInfo();
});

socket.on('ConnectionsInfo', function(connectionsInfo){
    info.connected = connectionsInfo.connections._connections;
    renderConnectionsInfo();
});

socket.on('clearMessages', function() {
    clearMessagesLocally();
});

getAuthor();

function getAuthor(){
    let user = localStorage.getItem('user');

    if(user){
        if (user === 'adm3214') {
            author = 'Auza Services';
            document.getElementById('clear-chat').style.display = 'block'; // Exibir botão Limpar o Chat
        } else {
            author = user;
        }
    }
    else if(!user){
        toggleBoxForNewUser('tog');
    }
}

function generateMessageTemplate({ message, author, time }) {
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
    
    if (author === 'Auza Services') {
        authorInfoElement.style.color = 'darkred';
        authorInfoElement.style.fontWeight = 'bold';
    }

    const messageTimeElement = document.createElement('span');
    messageTimeElement.textContent = time;

    authorInfoElement.appendChild(messageTimeElement);

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
    const messagesContainer = document.querySelector('.messages');
    const messageTemplate = generateMessageTemplate(message);

    messagesContainer.appendChild(messageTemplate);

    info.numberMessages += 1;
    moveScroll();
    renderConnectionsInfo();
}

function renderConnectionsInfo(){
    $('#online').html(`<h3><i class=""fas fa-circle""></i> ${info.connected} Online</h3>`);
    $('#messages-received').html(`<h3 id=""messages-received""><i class=""fad fa-inbox-in""></i> ${info.numberMessages} ${info.numberMessages === 1 ? ""Mensagem"" : ""Mensagens""}</h3>`);
}

function toggleBoxForNewUser(met){
    if(met === 'tog'){
        let input = document.getElementById('enter-user');
        input.classList.toggle('active');
        input.focus();
    }
    if(met === 'get'){
        let newUser = document.getElementById('input-user').value;

        if (newUser.length < 4 ){
            alert('Erro ao cadastrar usuário, tente um nome mais longo.');
            return null;
        }
        
        localStorage.setItem('user', newUser);
        author = newUser;
        toggleBoxForNewUser('tog');
    }
}

function moveScroll(){
    var objDiv = document.getElementById(""messages"");
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
        let now = new Date();
        let time = now.getHours() + ':' + now.getMinutes();
        if (now.getHours() > 12) {
            time += 'pm';
        } else {
            time += 'am';
        }

        var messageObject = {
            author,
            message,
            time,
        };

        renderMessage(messageObject);
        moveScroll();

        socket.emit('sendMessage', messageObject);
    }
}

function handleToggleLeftBar(){
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

window.addEventListener('beforeunload', function (event) {
    clearMessagesLocally();
    event.preventDefault();
    event.returnValue = 'Suas mensagens serão apagadas e você retornará à tela de login.';
});

window.addEventListener('unload', function (event) {
    endSession();
});"