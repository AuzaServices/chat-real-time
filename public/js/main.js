let author = '';

function submitLogin() {
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

    // Oculta a página de login e mostra o chat
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('chat-page').classList.remove('hidden');
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