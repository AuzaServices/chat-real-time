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
        window.location.href = "services.html";
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

  // Clique nos cards do carrossel de serviços
  const cards = document.querySelectorAll(".servico-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const selected = card.dataset.value;
      if (selected) {
        localStorage.setItem("selectedService", selected);
        window.location.href = "services.html";
      }
    });
  });
});

document.addEventListener('click', function (event) {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');

  const isClickInsideNav = nav.contains(event.target);
  const isClickOnToggle = toggle.contains(event.target);

  if (nav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
    nav.classList.remove('active');
  }
});

  // Executa quando a página carrega
  window.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.accept-btn');

    // Se já aceitou cookies antes, não mostra o banner
    if (localStorage.getItem('cookiesAccepted')) {
      banner.style.display = 'none';
    }

    // Ao clicar no botão "Aceitar e continuar"
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      banner.style.opacity = '0';
      setTimeout(() => {
        banner.style.display = 'none';
      }, 400); // tempo pra animar o desaparecimento
    });
  });