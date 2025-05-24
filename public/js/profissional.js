document.addEventListener("DOMContentLoaded", function () {
    const professionalData = localStorage.getItem("selectedProfessional");

    if (!professionalData) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    const professional = JSON.parse(professionalData);

    document.getElementById("professional-card").innerHTML = `
        <div class="card">
            <h3>${professional.name}</h3>
            <p>${professional.city}</p>
            <p>${professional.comment}</p>
            <a href="https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=Olá, gostaria de informações sobre seus serviços." target="_blank">Contato via WhatsApp</a>
        </div>
    `;
});