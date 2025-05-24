document.addEventListener("DOMContentLoaded", function () {
    const professionalData = localStorage.getItem("selectedProfessional");

    if (!professionalData) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name");

    // Lista de profissionais (certifique-se de que isso está corretamente carregado na sua aplicação)
    const professionals = [
        { name: "Leonardo", city: "Fortaleza - CE", age: 28, stars: "⭐⭐⭐", comment: "Pedreiro, Mestre de obra profissional.", whatsapp: "5585988559085" },
        { name: "Adonias", city: "Horizonte - CE", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável.", whatsapp: "5585992726761" }
    ];

    const professional = professionals.find(p => p.name === selectedName);

    const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=Olá, gostaria de informações sobre seus serviços.`;

    if (professional) {    
        document.getElementById("professional-card").innerHTML = `
            <div class="card">
                <h3>${professional.name}</h3>
                <p>${professional.city}</p>
                <p>Idade: ${professional.age} anos</p>
                <p>Avaliação: ${professional.stars}</p>
                <p>${professional.comment}</p>
                <a class="whatsapp-button" href="${whatsappLink}" target="_blank">💬 Contato via WhatsApp</a>
            </div>
        `;
    }
});