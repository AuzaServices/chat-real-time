function verificarSenha() {
    const senhaCorreta = "74141260314";
    const entrada = document.getElementById("senha").value;
    const msg = document.getElementById("msg");

    if (entrada === senhaCorreta) {
        document.getElementById("senha-container").style.display = "none";
        document.getElementById("painel").style.display = "block";
    } else {
        msg.textContent = "❌ Senha incorreta. Tente novamente.";
    }
}