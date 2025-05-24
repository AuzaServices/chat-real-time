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

        //Pedreiro 🧱🔨
        { service: "pedreiro", name: "Leonardo", age: 28, city: "Fortaleza - CE", stars: "⭐⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { service: "pedreiro", name: "Edilcimar Frazão", age: 53, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { service: "pedreiro", name: "Alberto", age: 33, city: "Fortaleza - CE", stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso", whatsapp: "5585994312887" },
        { service: "pedreiro", name: "Adonias", age: 42, city: "Horizonte - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral", whatsapp: "5585992726761" },
        //
        { service: "pedreiro", name: "Paulo Souza", age: 39, city: "Itaitinga - CE", stars: "⭐⭐⭐", comment: "Bom acabamento e rapidez.", whatsapp: "558599134065" },
        { service: "pedreiro", name: "Ricardo Mendes", age: 44, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "558599340656" },
        { service: "pedreiro", name: "Lucas Oliveira", age: 35, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "558599340657" },
        { service: "pedreiro", name: "José Lima", age: 47, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "558599134068" },
        { service: "pedreiro", name: "Marcelo Nunes", age: 41, city: "Pacajus - CE", stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { service: "pedreiro", name: "Rafael Costa", age: 37, city: "Itaitinga - CE", stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "558599140660" },
];

    // **Defina os profissionais destacados**
    const highlightedProfessionals = ["Matheus Alves","Adonias","Roberto Evangelista","Gabriel","Fernando","Cristiano","Marcio","Primo Fretes","Vinicius","Maycon"]; // Adicione os nomes dos profissionais que devem ser destacados

    const filteredProfessionals = professionals.filter(professional => professional.service === selectedService);

if (filteredProfessionals.length === 0) {
    
    mainContainer.innerHTML = `
        <div style="margin-left: 61px; text-align: center; max-width: 350px;">
            <img src="css/lupa.png" alt="Busca" style="width: 80px; height: 80px;">
            <p class="no-wrap-text" style="color: darkred;">Nenhum profissional cadastrado.</p>
        </div>
    `;
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

    // 🚀 Adiciona a funcionalidade de clique aqui!
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
        localStorage.setItem("selectedProfessional", JSON.stringify(professional));
        window.open("profissional.html", "_blank");
    });

    mainContainer.appendChild(card);
});
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

document.getElementById("continueButton").addEventListener("click", function() {
    let body = document.getElementById("mainBody");

    // Aplica a classe para remover completamente o fundo
    body.classList.add("no-background");

    // Como segurança extra, remove qualquer fundo diretamente
    body.style.backgroundImage = "none !important";
    body.style.backgroundColor = "white !important";

});

