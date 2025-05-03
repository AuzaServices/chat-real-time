document.addEventListener("DOMContentLoaded", function () {
    const mainContainer = document.querySelector(".grid-container");
    const selectedService = localStorage.getItem("selectedService");

    if (!selectedService) {
        mainContainer.innerHTML = "<p>Nenhum serviço selecionado. <a href='index.html'>Voltar</a></p>";
        return;
    }

    // **Remove o rodapé apenas na tela dos profissionais**
    document.addEventListener("DOMContentLoaded", function () {
        const footer = document.querySelector("footer");
        if (footer) {
            footer.parentNode.removeChild(footer);
        }
    });

    // **Lista fictícia com 10 profissionais por serviço**
    const professionals = [
        { service: "pedreiro", name: "Carlos Silva", age: 45, stars: "⭐⭐⭐⭐", comment: "Experiente em reformas e construção." },
        { service: "pedreiro", name: "João Ferreira", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Ótima qualidade e compromisso." },
        { service: "pedreiro", name: "Roberto Alves", age: 50, stars: "⭐⭐⭐⭐", comment: "Construção pesada e reformas estruturais." },
        { service: "pedreiro", name: "Fernando Martins", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável." },
        { service: "pedreiro", name: "Paulo Souza", age: 39, stars: "⭐⭐⭐⭐", comment: "Bom acabamento e rapidez." },
        { service: "pedreiro", name: "Ricardo Mendes", age: 44, stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas." },
        { service: "pedreiro", name: "Lucas Oliveira", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente." },
        { service: "pedreiro", name: "José Lima", age: 47, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado." },
        { service: "pedreiro", name: "Marcelo Nunes", age: 41, stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos." },
        { service: "pedreiro", name: "Rafael Costa", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra." }
    ];

    // **Filtra os profissionais de acordo com o serviço escolhido**
    const filteredProfessionals = professionals.filter(professional => professional.service === selectedService);

    if (filteredProfessionals.length === 0) {
        mainContainer.innerHTML = "<p>Nenhum profissional encontrado para este serviço.</p>";
        return;
    }

    mainContainer.innerHTML = ""; // Limpa a mensagem inicial

    filteredProfessionals.forEach(professional => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${professional.name}</h3>
            <p>Idade: ${professional.age} anos</p>
            <p>Avaliação: ${professional.stars}</p>
            <p>${professional.comment}</p>
            <a class="whatsapp-button" href="https://wa.me/5585991340658" target="_blank">
                Contato via WhatsApp
            </a>
        `;

        mainContainer.appendChild(card);
    });
});