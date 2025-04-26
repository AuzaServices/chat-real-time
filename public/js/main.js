// Inicializa a conexão com o socket
var socket = io('/');
var author = ''; // Nome e informação do usuário
var inactivityTimer = null; // Timer para inatividade
var inactivityTimeLimit = 20 * 60 * 1000; // 20 minutos em milissegundos

// Cria o rodapé
function createLoginFooter() {
    const footer = document.createElement('div');
    footer.id = "footer-container";
    footer.style.position = "fixed";
    footer.style.bottom = "0";
    footer.style.left = "0";
    footer.style.width = "100%";
    footer.style.backgroundColor = "#555"; // cinza chumbo
    footer.style.color = "#fff";
    footer.style.textAlign = "center";
    footer.style.padding = "10px 0";
    footer.style.fontSize = "14px";
    footer.style.zIndex = "9999";
    footer.textContent = "© 2025 Auza Services. Todos os direitos reservados.";
    document.body.appendChild(footer);
}

// Remove o rodapé
function removeLoginFooter() {
    const footer = document.getElementById('footer-container');
    if (footer) {
        footer.remove();
    }
}

function showEntryAlert() {
    const alertBox = document.getElementById('entry-alert');
    if (alertBox) {
        // Exibe o primeiro alerta
        alertBox.textContent = "Aguarde a entrada do Profissional/Cliente no Chat...";
        alertBox.style.backgroundColor = "darkred";
        alertBox.style.opacity = "1"; // Aparece gradualmente
        setTimeout(() => {
            alertBox.style.opacity = "0"; // Desaparece suavemente
            setTimeout(() => {
                // Exibe o segundo alerta no mesmo container após o primeiro desaparecer
                showSecondAlert(alertBox);
            }, 1000); // Tempo de espera antes de exibir o segundo alerta
        }, 6000); // Tempo que o primeiro alerta permanece visível
    }
}

function showSecondAlert(alertBox) {
    // Atualiza o texto para o segundo alerta
    alertBox.textContent = "Envie Imagens para facilitar o orçamento, se necessário.";
    alertBox.style.backgroundColor = "darkred";
    alertBox.style.opacity = "1"; // Aparece suavemente
    setTimeout(() => {
        alertBox.style.opacity = "0"; // Desaparece suavemente
        setTimeout(() => {
            // Exibe o terceiro alerta no mesmo container após o segundo desaparecer
            showThirdAlert(alertBox);
        }, 1000); // Tempo de espera antes de exibir o terceiro alerta
    }, 6000); // Tempo que o segundo alerta permanece visível
}

function showThirdAlert(alertBox) {
    // Atualiza o texto para o terceiro alerta
    alertBox.textContent = "Estamos organizando sua experiência. Aguarde...";
    alertBox.style.backgroundColor = "darkred";
    alertBox.style.opacity = "1"; // Aparece suavemente
    setTimeout(() => {
        alertBox.style.opacity = "0"; // Desaparece suavemente
    }, 30000); // Tempo que o terceiro alerta permanece visível
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

    showEntryAlert();
    removeLoginFooter();
    loadAuthor();
    resetInactivityTimer();
}

// Função para limpar o chat globalmente
function clearChat() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    socket.emit('clearChat');
}

// Carrega o autor do localStorage ao entrar no chat
function loadAuthor() {
    author = localStorage.getItem('user') || '';
}

// Valida se a mensagem contém um número telefônico
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

// Evento para envio de imagem ao servidor com redimensionamento
function triggerImageUpload() {
    document.getElementById('image-input').click();
}

document.getElementById('image-input').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;

            img.onload = function () {
                // Configura o canvas para redimensionar a imagem
                const canvas = document.createElement('canvas');
                const maxWidth = 1024; // Define uma largura máxima
                const maxHeight = 1024; // Define uma altura máxima
                let width = img.width;
                let height = img.height;

                // Mantém a proporção ao redimensionar
                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    } else {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converte a imagem para JPEG base64
                const resizedImage = canvas.toDataURL('image/jpeg', 0.8); // Qualidade 80%

                // Envia a imagem convertida ao servidor
                const imageObject = {
                    author: author || 'Anônimo',
                    image: resizedImage
                };

                socket.emit('sendMessage', imageObject);
            };

            img.onerror = function () {
                alert('Erro ao processar a imagem. Tente novamente com outra imagem ou formato.');
            };
        };

        reader.onerror = function () {
            console.error('Erro ao processar o arquivo.');
            alert('Não foi possível enviar a imagem. Verifique o formato ou tamanho.');
        };

        reader.readAsDataURL(file); // Lê o arquivo como Base64
    } else {
        alert('Nenhuma imagem foi selecionada.');
    }
});

// Renderiza mensagens e imagens no chat
function renderMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const authorElement = document.createElement('h2');
    authorElement.innerHTML = message.author;

    if (message.image) {
        const imageElement = document.createElement('img');
        imageElement.src = message.image;
        imageElement.style.maxWidth = '100%';
        imageElement.style.borderRadius = '5px';
        messageElement.appendChild(authorElement);
        messageElement.appendChild(imageElement);
    } else {
        const messageTextElement = document.createElement('p');
        messageTextElement.textContent = message.message;
        messageElement.appendChild(authorElement);
        messageElement.appendChild(messageTextElement);
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Configurações do socket
socket.off('receivedMessage');
socket.on('receivedMessage', function (message) {
    renderMessage(message);
});

socket.off('previousMessages');
socket.on('previousMessages', function (messages) {
    messages.forEach((message) => {
        renderMessage(message);
    });
});

socket.on('clearChat', function () {
    document.getElementById('messages').innerHTML = '';
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

// Executa ao carregar
window.onload = function () {
    createLoginFooter();
};