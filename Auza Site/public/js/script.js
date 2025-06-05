document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("service-form");
    const joinButton = document.getElementById("joinButton");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const selectedService = document.getElementById("services").value;

            if (selectedService) {
                localStorage.setItem("selectedService", selectedService); // Salva no localStorage
                window.location.href = "services.html"; // Redireciona para a tela de profissionais
            } else {
                alert("Por favor, selecione um serviço antes de continuar!");
            }
        });
    }

    if (joinButton) {
        joinButton.addEventListener("click", function() {
            window.location.href = "cadastro.html"; // 🚀 Agora redireciona para o cadastro!
        });
    }
});