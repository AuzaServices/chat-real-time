document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name");

    if (!selectedName) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    // Lista de profissionais completa, seguindo seu modelo
    const professionals = [
        { name: "Leonardo", city: "Fortaleza - CE", age: 28, stars: "⭐⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085" },
        { name: "Edilcimar Frazão", city: "Fortaleza - CE", age: 53, stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266" },
        { name: "Alberto", city: "Fortaleza - CE", age: 33, stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso.", whatsapp: "5585994312887" },
        { name: "Adonias", city: "Horizonte - CE", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral.", whatsapp: "5585992726761" },
        { name: "Paulo Souza", city: "Itaitinga - CE", age: 39, stars: "⭐⭐⭐", comment: "Bom acabamento e rapidez.", whatsapp: "558599134065" },
        { name: "Ricardo Mendes", city: "Pacajus - CE", age: 44, stars: "⭐⭐⭐⭐", comment: "Especialista em reformas rápidas.", whatsapp: "558599340656" },
        { name: "Lucas Oliveira", city: "Itaitinga - CE", age: 35, stars: "⭐⭐⭐⭐⭐", comment: "Muito detalhista e eficiente.", whatsapp: "558599340657" },
        { name: "José Lima", city: "Pacajus - CE", age: 47, stars: "⭐⭐⭐⭐", comment: "Trabalho limpo e bem planejado.", whatsapp: "558599134068" },
        { name: "Marcelo Nunes", city: "Pacajus - CE", age: 41, stars: "⭐⭐⭐⭐", comment: "Experiente em grandes projetos.", whatsapp: "558599140659" },
        { name: "Rafael Costa", city: "Itaitinga - CE", age: 37, stars: "⭐⭐⭐⭐⭐", comment: "Ótima comunicação e execução de obra.", whatsapp: "558599140660" }
    ];

    const professional = professionals.find(p => p.name === selectedName);

    if (professional) {
        const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=Olá, gostaria de informações sobre seus serviços.`;

        document.getElementById("professional-card").innerHTML = `
            <div class="card">
                <h3>${professional.name}</h3>
                <p>${professional.city}</p>
                <p>Idade: ${professional.age} anos</p>
                <p>Avaliação: ${professional.stars}</p>
                <p>${professional.comment}</p>
                <a class="whatsapp-button" href="${whatsappLink}" target="_blank"> Contato via WhatsApp</a>
            </div>
        `;
    } else {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
    }
});