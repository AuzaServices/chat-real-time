document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const selectedName = params.get("name");

    if (!selectedName) {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
        return;
    }

    // Lista de profissionais
    const professionals = [
    { name: "Leonardo", city: "Fortaleza - CE", age: 28, stars: "⭐⭐⭐", comment: "Pedreiro, Mestre de obra profissional. Entendo de projetos.", whatsapp: "5585988559085", link: "https://clientes2.onrender.com/profissional.html?name=Leonardo" },
    { name: "Edilcimar Frazão", city: "Fortaleza - CE", age: 53, stars: "⭐⭐", comment: "Área de acabamento da constr. civil, PVC, Gesso, Porcel/Cerâmica.", whatsapp: "5585992363266", link: "https://seudominio.com.br/profissional.html?name=Edilcimar%20Frazão" },
    { name: "Alberto", city: "Fortaleza - CE", age: 33, stars: "⭐⭐", comment: "Área de Construção. Dedicação, Qualidade e Compromisso.", whatsapp: "5585994312887", link: "https://seudominio.com.br/profissional.html?name=Alberto" },
    { name: "Adonias", city: "Horizonte - CE", age: 42, stars: "⭐⭐⭐⭐", comment: "Trabalho de alvenaria impecável. Serviços em Geral.", whatsapp: "5585992726761", link: "https://seudominio.com.br/profissional.html?name=Adonias" }
];

    // Lista de profissionais destacados
    const highlightedProfessionals = new Set([
        "Andreza Lima", "César Freire", "Matheus Alves", "Adonias",
        "Roberto Evangelista", "Gabriel", "Fernando", "Cristiano",
        "Marcio", "Primo Fretes", "Vinicius", "Maycon"
    ]);

    // Encontrar o profissional selecionado
    const professional = professionals.find(p => p.name.trim() === selectedName.trim());

    if (professional) {
        const whatsappLink = `https://api.whatsapp.com/send?phone=${professional.whatsapp}&text=Olá, vim por meio da Auza Services, gostaria de realizar um orçamento de serviço.`;

        const isHighlighted = highlightedProfessionals.has(professional.name.trim());
        const highlightedClass = isHighlighted ? "highlighted" : "";
        const nameClass = isHighlighted ? "highlighted-name" : "";

        document.getElementById("professional-card").innerHTML = `
            <div class="card ${highlightedClass}">
                <h3 class="${nameClass}">${professional.name}</h3>
                <p>${professional.city}</p>
                <p>Idade: ${professional.age} anos</p>
                <p>Avaliação: ${professional.stars}</p>
                <p>${professional.comment}</p>
                <a class="whatsapp-button" href="${whatsappLink}" target="_blank">Contato via WhatsApp</a>
            </div>
        `;

const professionalUrl = window.location.href;

document.querySelector('meta[property="og:url"]').setAttribute("content", professionalUrl);
document.querySelector('meta[property="og:title"]').setAttribute("content", `${professional.name} - Profissional`);
document.querySelector('meta[property="og:description"]').setAttribute("content", professional.comment);
document.querySelector('meta[property="og:url"]').setAttribute("content", professionalUrl);

        document.getElementById("shareButton").addEventListener("click", function () {
            navigator.clipboard.writeText(professionalUrl).then(() => {
                alert("Link copiado para a área de transferência!");
            }).catch(err => {
                console.error("Erro ao copiar o link:", err);
            });
        });

        document.getElementById("backButton").addEventListener("click", function () {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    } else {
        document.getElementById("professional-card").innerHTML = "<p>Profissional não encontrado.</p>";
    }
});