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
        window.location.href = "/services";
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
        window.location.href = "/services";
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

  const banner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.accept-btn');

  // Evento ao aceitar
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('leaveTime', Date.now().toString()); // salva o momento de saída inicial
    banner.style.opacity = '0';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  });

  // Ao sair da página (antes de fechar ou atualizar)
  window.addEventListener('beforeunload', () => {
    if (localStorage.getItem('cookiesAccepted')) {
      localStorage.setItem('leaveTime', Date.now().toString());
    }
  });

  // Ao voltar ou abrir a página
  window.addEventListener('DOMContentLoaded', () => {
    const consent = localStorage.getItem('cookiesAccepted');
    const leaveTime = localStorage.getItem('leaveTime');

    if (consent && leaveTime) {
      const now = Date.now();
      const tenMinutes = 10 * 60 * 1000;
      const difference = now - parseInt(leaveTime);

      if (difference < tenMinutes) {
        banner.style.display = 'none'; // ainda dentro da janela de 10 min
      } else {
        localStorage.removeItem('cookiesAccepted'); // expirou
        localStorage.removeItem('leaveTime');
      }
    }
  });