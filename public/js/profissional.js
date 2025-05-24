document.addEventListener("DOMContentLoaded", function () {
const professionalData = sessionStorage.getItem("selectedProfessional");

    if (!professionalData) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    const professional = JSON.parse(professionalData);

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
});