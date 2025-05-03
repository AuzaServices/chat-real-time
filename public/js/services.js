document.addEventListener("DOMContentLoaded", function () {
    const mainContainer = document.querySelector(".grid-container");
    const selectedService = localStorage.getItem("selectedService"); // Recupera a escolha do usuário

    if (!selectedService) {
        mainContainer.innerHTML = "<p>Nenhum serviço selecionado. <a href='index.html'>Voltar</a></p>";
        return;
    }

    // **Lista de profissionais**
    const professionals = [
        { service: "pedreiro", name: "Carlos Silva", age: 45, stars: "⭐⭐", comment: "Experiente em reformas e construção." },
        { service: "pedreiro", name: "João Ferreira", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Ótima qualidade e compromisso." },
        { service: "servente", name: "Ana Costa", age: 22, stars: "⭐⭐⭐⭐", comment: "Auxiliar de obra dedicada e competente." },
        { service: "servente", name: "Rafaela Dias", age: 29, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho ágil e eficiente." },
        { service: "bombeiro-hidraulico", name: "Fernando Souza", age: 41, stars: "⭐⭐⭐⭐", comment: "Especialista em sistemas hidráulicos." },
        { service: "bombeiro-hidraulico", name: "Diego Mendes", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado." },
        { service: "pintor", name: "Márcio Oliveira", age: 47, stars: "⭐⭐⭐⭐", comment: "Acabamento impecável e ótimas técnicas." },
        { service: "pintor", name: "Lucas Almeida", age: 33, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e detalhado." },
        { service: "eletricista", name: "Marcos Sousa", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Serviços elétricos de qualidade." },
        { service: "diarista", name: "Maria Silva", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Limpeza impecável e dedicação." }
        
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
        `;

        mainContainer.appendChild(card);
    });
});