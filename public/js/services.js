const mainContainer = document.querySelector(".grid-container");
const serviceSelect = document.getElementById("services"); // Seleciona o dropdown

// Lista de profissionais com serviço especificado
const professionals = [
    { service: "pedreiro", name: "Carlos Silva", age: 45, stars: "⭐⭐⭐⭐", comment: "Experiente em reformas e construção." },
    { service: "pedreiro", name: "João Ferreira", age: 38, stars: "⭐⭐⭐⭐⭐", comment: "Ótima qualidade e compromisso." },

    { service: "servente", name: "Ana Costa", age: 32, stars: "⭐⭐⭐⭐", comment: "Auxiliar de obra dedicada e competente." },
    { service: "servente", name: "Rafaela Dias", age: 29, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho ágil e eficiente." },

    { service: "bombeiro-hidraulico", name: "Fernando Souza", age: 41, stars: "⭐⭐⭐⭐", comment: "Especialista em sistemas hidráulicos." },
    { service: "bombeiro-hidraulico", name: "Diego Mendes", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Garantia de serviço bem executado." },

    { service: "pintor", name: "Márcio Oliveira", age: 47, stars: "⭐⭐⭐⭐", comment: "Acabamento impecável e ótimas técnicas." },
    { service: "pintor", name: "Lucas Almeida", age: 33, stars: "⭐⭐⭐⭐⭐", comment: "Trabalho limpo e detalhado." },

    // Continue adicionando os demais profissionais...
];

// Criar os cartões e definir o serviço no select
professionals.forEach(professional => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${professional.name} - ${professional.service}</h3>
        <p>Idade: ${professional.age} anos</p>
        <p>Avaliação: ${professional.stars}</p>
        <p>${professional.comment}</p>
    `;

    mainContainer.appendChild(card);
});

// Redirecionamento baseado no armazenamento local
window.addEventListener("load", function() {
    if (!localStorage.getItem("visited")) {
        window.location.href = "index.html"; // Redireciona apenas em atualizações manuais
    } else {
        localStorage.removeItem("visited"); // Remove a marcação após entrar
    }
});

// Verificar visibilidade do footer
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector("footer");
    const cardsSection = document.querySelector(".grid-container");

    function checkVisibility() {
        const rect = cardsSection.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        // Se os cartões estiverem visíveis, oculta o footer
        if (rect.top < screenHeight * 0.5) {
            footer.style.display = "none";
        } else {
            footer.style.display = "block";
        }
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    checkVisibility(); // Executa a verificação inicial
});