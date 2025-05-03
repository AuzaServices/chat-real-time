document.addEventListener("DOMContentLoaded", function () {
    const serviceForm = document.getElementById("service-form");
    const serviceSelect = document.getElementById("services");

    serviceForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedService = serviceSelect.value;

        if (!selectedService) {
            alert("Por favor, selecione um serviço antes de continuar!");
            return;
        }

        // **Armazena o serviço escolhido e redireciona**
        localStorage.setItem("selectedService", selectedService);
        window.location.href = "services.html"; // Redireciona para a tela de profissionais
    });
});