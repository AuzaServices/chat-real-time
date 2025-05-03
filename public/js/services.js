document.addEventListener("DOMContentLoaded", function () {
    const mainContainer = document.querySelector(".grid-container");
    const selectedService = localStorage.getItem("selectedService"); // Recupera o serviço escolhido pelo usuário

    if (!selectedService) {
        mainContainer.innerHTML = "<p>Nenhum serviço selecionado. <a href='index.html'>Voltar</a></p>";
        return;
    }

    // **Lista fictícia de profissionais organizados pelos 9 serviços**
    const professionals = [
        // 🏗️ Pedreiros
        { service: "pedreiro", name: "Carlos Silva", age: 45, stars: "⭐⭐⭐", comment: "Experiente em reformas e construção." },
        { service: "pedreiro", name: "João Ferreira", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Ótima qualidade e compromisso." },

        // 🔨 Serventes
        { service: "servente", name: "Ana Costa", age: 22, stars: "⭐⭐⭐⭐", comment: "Auxiliar de obra dedicada e competente." },
        { service: "servente", name: "Rafaela Dias", age: 29, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho ágil e eficiente." },

        // 🚰 Bombeiros Hidráulicos
        { service: "bombeiro-hidraulico", name: "Fernando Souza", age: 41, stars: "⭐⭐⭐⭐", comment: "Especialista em sistemas hidráulicos." },
        { service: "bombeiro-hidraulico", name: "Diego Mendes", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado." },

        // 🎨 Pintores
        { service: "pintor", name: "Márcio Oliveira", age: 47, stars: "⭐⭐⭐⭐", comment: "Acabamento impecável e ótimas técnicas." },
        { service: "pintor", name: "Lucas Almeida", age: 33, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e detalhado." },

        // 🌿 Capinadores
        { service: "capinador", name: "Roberto Lima", age: 39, stars: "⭐⭐⭐", comment: "Especialista em capinação e limpeza." },
        { service: "capinador", name: "Fernanda Moreira", age: 31, stars: "⭐⭐⭐⭐", comment: "Trabalho eficiente e rápido." },

        // ⚡ Eletricistas
        { service: "eletricista", name: "Marcos Sousa", age: 45, stars: "⭐⭐⭐⭐⭐", comment: "Serviços elétricos de qualidade." },
        { service: "eletricista", name: "Paula Andrade", age: 34, stars: "⭐⭐⭐⭐", comment: "Profissional confiável e experiente." },

        // 🏠 Montadores de Móveis
        { service: "montador-de-moveis", name: "Ricardo Alves", age: 30, stars: "⭐⭐⭐⭐", comment: "Montagem rápida e eficiente." },
        { service: "montador-de-moveis", name: "Juliana Martins", age: 29, stars: "⭐⭐⭐⭐⭐", comment: "Ótima organização e trabalho detalhado." },

        // 🚚 Caminhões de Frete
        { service: "caminhao-de-frete", name: "José Oliveira", age: 50, stars: "⭐⭐⭐⭐", comment: "Transporte seguro e eficiente." },
        { service: "caminhao-de-frete", name: "Amanda Costa", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Fretes rápidos e confiáveis." },

        // 🧹 Diaristas
        { service: "diarista", name: "Maria Silva", age: 42, stars: "⭐⭐⭐⭐⭐", comment: "Limpeza impecável e dedicação." },
        { service: "diarista", name: "Carlos Mendes", age: 28, stars: "⭐⭐⭐⭐", comment: "Cuida dos detalhes na limpeza." }
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