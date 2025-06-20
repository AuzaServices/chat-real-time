document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("service-form");
    const joinButton = document.getElementById("joinButton");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const selectedService = document.getElementById("services").value;

            if (selectedService) {
                localStorage.setItem("selectedService", selectedService); // Salva no localStorage
                window.location.href = "services.html"; // Redireciona para a tela de profissionais
            } else {
                alert("Por favor, selecione um serviço antes de continuar!");
            }
        });
    }

    if (joinButton) {
        joinButton.addEventListener("click", function() {
            window.location.href = "cadastro.html"; // 🚀 Agora redireciona para o cadastro!
        });
    }
});

<script>
const nomes = [
  "Maria", "João", "Ana", "Carlos", "Beatriz", "Lucas", "Fernanda", "Pedro", "Juliana", "Rafael",
  "Camila", "Gabriel", "Larissa", "Felipe", "Isabela", "André", "Patrícia", "Rodrigo", "Aline", "Eduardo",
  "Tatiane", "Vinícius", "Letícia", "Marcelo", "Bruna", "Diego", "Natália", "Thiago", "Amanda", "Gustavo",
  "Vanessa", "Daniel", "Carolina", "Leonardo", "Renata", "Bruno", "Débora", "Murilo", "Elaine", "Henrique",
  "Sabrina", "Igor", "Simone", "Fábio", "Jéssica", "Alex", "Paula", "Otávio", "Michele", "Caio",
  "Luan", "Tatiana", "Danilo", "Marina", "Wesley", "Bianca", "Alan", "Nicole", "Samuel", "Viviane",
  "Douglas", "Helena", "Vitor", "Cristina", "Nathan", "Rita", "Matheus", "Daniela", "Hugo", "Priscila",
  "Leandro", "Melissa", "Antônio", "Lorena", "José", "Cláudia", "Roberto", "Marta", "Sérgio", "Elaine",
  "Ricardo", "Tainá", "Alexandre", "Rayssa", "Maurício", "Lívia", "Otávia", "Caíque", "Esther", "Joana",
  "Enzo", "Rebeca", "Luana", "Cristiano", "Yasmin", "Emanuel", "Valéria", "Raul", "Clarice", "Túlio"
];

const servicos = ["Pedreiro", "Eletricista", "Encanador", "Pintor", "Marceneiro", "Jardineiro", "Diarista", "Montador", "Serralheiro", "Gesseiro"];

let seed = Date.now(); // Persistência simples

function gerarNotificacao() {
  const container = document.getElementById("notificacoes-container");
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const servico = servicos[Math.floor(Math.random() * servicos.length)];
  const hora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const div = document.createElement("div");
  div.className = "notificacao";
  div.innerHTML = `<span>🔔 ${nome} fechou ${servico}</span><span>${hora}</span>`;
  container.appendChild(div);

  // Remove após alguns segundos
  setTimeout(() => div.remove(), 8000);
}

// Loop infinito com tempo aleatório
function iniciarNotificacoes() {
  const intervalo = Math.floor(Math.random() * 4000) + 2000; // entre 2s e 6s
  gerarNotificacao();
  setTimeout(iniciarNotificacoes, intervalo);
}

window.addEventListener("load", () => {
  // Garante que não reinicie do mesmo ponto
  seed += Math.floor(Math.random() * 1000);
  Math.seedrandom?.(seed); // Se quiser usar uma lib como seedrandom.js
  iniciarNotificacoes();
});
</script>