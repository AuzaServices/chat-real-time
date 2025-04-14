var socket = io('/');
var info = {
    numberMessages: 0,
    connected: 0
}
var author = ''


socket.on('receivedMessage', function(message){
    renderMessage(message)
});

socket.on('previousMessages', function(messages){
    for (message of messages){
        renderMessage(message)
    };

    renderConnectionsInfo()

});

socket.on('ConnectionsInfo', function(connectionsInfo){
    info.connected = connectionsInfo.connections._connections;
    renderConnectionsInfo();
})

getAuthor()
        
function getAuthor(){
    let user = localStorage.getItem('user')

    if(user){
        author = user
    }
    else if(!user){
        toggleBoxForNewUser('tog')
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
    $('#online').html(`<h3><i class="fas fa-circle"></i> ${info.connected} Online</h3>`)

    $('#messages-received').html(`<h3 id="messages-received"><i class="fad fa-inbox-in"></i> ${info.numberMessages} ${info.numberMessages === 1 ? "Mensagem" : "Mensagens"}</h3>`)
}

function toggleBoxForNewUser(met){
    if(met === 'tog'){
        let input = document.getElementById('enter-user');
        input.classList.toggle('active');
        input.focus()
    }
    if(met === 'get'){
        let newUser = document.getElementById('input-user').value;

        if (newUser.length < 4 ){
            alert('Erro ao cadastrar usuário, tente um nome mais longo.')
            return null
        }
        
        localStorage.setItem('user', newUser)
        author = newUser
        toggleBoxForNewUser('tog')
    }
}

function moveScroll(){
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function Submit(event){
    event.preventDefault();

    getAuthor()

    var message = document.querySelector('input[name=message]').value;
    $('#input-message').val('')

    if(message.length){
        let now = new Date
        let time = now.getHours() + ':' + now.getMinutes()
        if (now.getHours() > 12){
            time += 'pm';
        }
        else{
            time += 'am';
        };

        var messageObject = {
            author,
            message,
            time,
        }

        renderMessage(messageObject)
        moveScroll()

        socket.emit('sendMessage', messageObject);
    } 
};

function handleToggleLeftBar(){
    const bar = document.querySelector('#left-bar');
    const chat = document.querySelector('#chat-area');
    const icon = document.querySelector('#toggleInfo');

    bar.classList.toggle('active');
    chat.classList.toggle('active');

    icon.className = icon.className === 'fal fa-info-circle' ? 'fal fa-times' : 'fal fa-info-circle';
}

function toggleUserSelection() {
    const selectionBox = document.getElementById('user-selection');
    selectionBox.classList.toggle('active');
}

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
    document.getElementById('user-selection').classList.toggle('active');
    document.getElementById('enter-user').classList.add('active');
}

function submitUserInfo() {
    const name = document.getElementById('input-name').value;
    const bairroOrProfissao = document.getElementById('input-bairro') 
        ? document.getElementById('input-bairro').value 
        : document.getElementById('input-profissao').value;

    if (name.length < 4 || bairroOrProfissao.length < 4) {
        alert('Por favor, preencha todos os campos corretamente.');
        return null;
    }

    const formattedName = document.getElementById('input-bairro') 
        ? `${name} | ${bairroOrProfissao}` 
        : `${name} | ${bairroOrProfissao}`;
    
    localStorage.setItem('user', formattedName);
    author = formattedName;

    toggleBoxForNewUser('tog'); // Fechar o box de novo usuário
}

function submitUserInfo() {
    const name = document.getElementById('input-name').value;
    const bairroOrProfissao = document.getElementById('input-bairro') 
        ? document.getElementById('input-bairro').value 
        : document.getElementById('input-profissao').value;

    if (name.length < 4 || bairroOrProfissao.length < 4) {
        alert('Por favor, preencha todos os campos corretamente.');
        return null;
    }

    const formattedName = document.getElementById('input-bairro') 
        ? `${name} | ${bairroOrProfissao}` 
        : `${name} | ${bairroOrProfissao}`;
    
    localStorage.setItem('user', formattedName);
    author = formattedName;

    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('chat-screen').classList.add('active');
    document.getElementById('chat-screen').classList.remove('hidden');
}

// Alterna entre as telas de login e chat
function submitUserInfo() {
    const name = document.getElementById('input-name').value;
    const bairroOrProfissao = document.getElementById('input-bairro') 
        ? document.getElementById('input-bairro').value 
        : document.getElementById('input-profissao').value;

    if (name.length < 4 || bairroOrProfissao.length < 4) {
        alert('Por favor, preencha todos os campos corretamente.');
        return null;
    }

    const formattedName = `${name} | ${bairroOrProfissao}`;
    localStorage.setItem('user', formattedName);
    author = formattedName;

    // Alternar telas
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('chat-screen').classList.add('active');
    document.getElementById('chat-screen').classList.remove('hidden');
}