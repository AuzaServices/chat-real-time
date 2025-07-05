
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("service-select-form");
  const select = document.getElementById("servico");
  const joinButton = document.getElementById("joinButton");

  // Submissão do formulário de seleção de serviços
  if (form && select) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const selectedService = select.value;

      if (selectedService) {
        localStorage.setItem("selectedService", selectedService);
        window.location.href = "services.html"; // redireciona para a tela de profissionais
      } else {
        alert("Por favor, selecione um serviço antes de continuar!");
      }
    });
  }

  // Clique no botão "Junte-se a Nós"
  if (joinButton) {
    joinButton.addEventListener("click", function () {
      window.location.href = "cadastro.html";
    });
  }
});