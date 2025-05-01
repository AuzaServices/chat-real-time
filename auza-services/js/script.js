document.getElementById("service-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const selectedService = document.getElementById("services").value;
    
    if (selectedService) {
        localStorage.setItem("visited", "true"); // Salva indicador
        window.location.href = "services.html";
    } else {
        alert("Por favor, selecione um serviço antes de continuar!");
    }
});