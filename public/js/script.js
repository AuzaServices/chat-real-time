document.addEventListener("DOMContentLoaded", function () {
    // ✅ Sempre que a página carregar, limpar o serviço selecionado
    localStorage.removeItem("selectedService");

    const form = document.getElementById("service-form");

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
});

document.getElementById("joinButton").addEventListener("click", function() {
    const phoneNumber = "5585991340658";
    const message = "Quero fazer parte do time!";
    const encodedMessage = encodeURIComponent(message);
    
    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
});