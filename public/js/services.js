document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("selectedService")) {
        window.location.href = "index.html";
        return;
    }

    const mainContainer = document.querySelector(".grid-container");
    const selectedService = localStorage.getItem("selectedService");

    if (!selectedService) {
        mainContainer.innerHTML = "<p>Nenhum serviço selecionado. <a href='index.html'>Voltar</a></p>";
        return;
    }

    const footer = document.querySelector("footer");
    if (footer) {
        footer.parentNode.removeChild(footer);
    }

    // **Lista de profissionais**
    const professionals = [
        { service: "pedreiro", name: "Carlos Silva", age: 45, city: "Horizonte - CE", stars: "⭐⭐⭐", comment: "Experiente em reformas e construção.", whatsapp: "5585991340651" },
        { service: "pedreiro", name: "João Ferreira", age: 38, city: "Horizonte - CE", stars: "⭐⭐⭐⭐⭐", comment: "Ótima qualidade e compromisso.", whatsapp: "5585991340652" },
        { service: "pedreiro", name: "Roberto Alves", age: 50, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Construção pesada e reformas estruturais.", whatsapp: "5585991340653" },
        { service: "pedreiro", name: "Fernando Martins", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável.", whatsapp: "5585991340654" },
        { service: "pedreiro", name: "Paulo Souza", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Bom acabamento e rapidez.", whatsapp: "5585991340655" },
    ];

    // **Defina os profissionais destacados**
    const highlightedProfessionals = ["João Ferreira",]; // Adicione os nomes dos profissionais que devem ser destacados

    const filteredProfessionals = professionals.filter(professional => professional.service === selectedService);

    if (filteredProfessionals.length === 0) {
        mainContainer.innerHTML = "<p>Nenhum profissional encontrado para este serviço.</p>";
        return;
    }

    mainContainer.innerHTML = "";

    filteredProfessionals.forEach(professional => {
        const card = document.createElement("div");

        // Verifica se o profissional está na lista de destaques
        if (highlightedProfessionals.includes(professional.name)) {
            card.classList.add("card", "highlighted");
        } else {
            card.classList.add("card");
        }

        const message = "Olá, vim por meio da Auza Services, gostaria de realizar um orçamento de serviço.";
        const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=${encodeURIComponent(message)}`;

        card.innerHTML = `
            <h3 class="${highlightedProfessionals.includes(professional.name) ? 'highlighted-name' : ''}">${professional.name}</h3>
            <p>${professional.city}</p>
            <p>Idade: ${professional.age} anos</p>
            <p>Avaliação: ${professional.stars}</p>
            <p>${professional.comment}</p>
            ${highlightedProfessionals.includes(professional.name) ? '<p class="destaque">Destaque</p>' : ''}
            <a class="whatsapp-button" href="${whatsappLink}" target="_blank">Contato via WhatsApp</a>
        `;

        mainContainer.appendChild(card);
    });
});