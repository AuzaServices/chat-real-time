let author = '';

function toggleBoxForNewUser(met) {
    if (met === 'tog') {
        let input = document.getElementById('enter-user');
        input.classList.toggle('active');
        input.focus();
    } else if (met === 'get') {
        const userType = document.querySelector('input[name=userType]:checked').value;
        let userName = document.getElementById('input-name').value;
        let userDetail = document.getElementById('input-detail').value;

        if (userName.length < 4 || userDetail.length < 3) {
            alert('Erro: Nome ou detalhe muito curto.');
            return null;
        }

        const formattedUser = userType === 'Cliente'
            ? `${userName} | ${userDetail}`
            : `${userName} | ${userDetail}`;
        localStorage.setItem('user', formattedUser);
        author = formattedUser;

        toggleBoxForNewUser('tog');
    }
}

function updateFields() {
    const userType = document.querySelector('input[name=userType]:checked').value;
    const detailField = document.getElementById('input-detail');

    if (userType === 'Cliente') {
        detailField.placeholder = 'Bairro';
    } else if (userType === 'Profissional') {
        detailField.placeholder = 'Profissão';
    }
}

function Submit(event) {
    event.preventDefault();
    const message = document.querySelector('#input-message').value;
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;

    if (message.length) {
        const messageObject = { author, message, time };
        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
    }
}