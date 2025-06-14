// 📊 Carregar dados do painel automaticamente
async function carregarDados() {
    try {
        const response = await fetch("/api/dados");
        const dados = await response.json();

        if (dados.trafego && dados.cliques) {
            const tabelaTrafego = document.getElementById("tabela-trafego");
            const tabelaCliques = document.getElementById("tabela-cliques");

            tabelaTrafego.innerHTML = dados.trafego.map(item => `
                <tr>
                    <td>${item.pagina}</td>
                    <td>${item.acessos}</td>
                    <td>${item.data}</td>
                </tr>
            `).join("");

            tabelaCliques.innerHTML = dados.cliques.map(item => `
                <tr>
                    <td>${item.Profissional}</td>
                    <td>${item.Profissão}</td>
                    <td>${item.Chamadas}</td>
                </tr>
            `).join("");

            console.log("✅ Dados atualizados automaticamente!");
        }
    } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
    }
}

// 🔄 Atualizar automaticamente a cada 2 segundos
setInterval(carregarDados, 2000);

// 🔥 Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDados);

// 🛡️ Verifica senha antes de exibir painel
function verificarSenha() {
    const senhaCorreta = "74141260314";
    const entrada = document.getElementById("senha").value;
    const msg = document.getElementById("msg");

    if (entrada === senhaCorreta) {
        document.getElementById("senha-container").style.display = "none";
        document.getElementById("painel").style.display = "block";
    } else {
        msg.textContent = "❌ Senha incorreta. Tente novamente.";
    }
}

// ☰ Abre ou fecha o menu lateral
function abrirMenu() {
    const menu = document.getElementById("menu-lateral");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// 🏅 Exibe o painel de controle Gold
function exibirPainelGold() {
    document.getElementById("goldContainer").style.display = "block";
}

// 🔄 Recupera clientes Gold do `localStorage`
let clientesGold = JSON.parse(localStorage.getItem("clientesGold")) || [];

// 🔄 Atualiza a lista de clientes Gold na página
function atualizarLista() {
    const container = document.getElementById("goldContainerContent");
    container.innerHTML = "";
    const hoje = new Date();

    clientesGold.forEach((cliente, index) => {
        const inicio = new Date(cliente.inicio);
        const diff = 30 - Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
        const diasRestantes = diff > 0 ? diff : 0;

        const div = document.createElement("div");
        div.className = "gold";
        div.innerHTML = `
            <input type="text" value="${cliente.nome}" onchange="editarNome(${index}, this.value)">
            <input type="date" value="${cliente.inicio}" onchange="editarData(${index}, this.value)">
            <span>Restam: ${diasRestantes} dias</span>
            <button onclick="removerCliente(${index})">❌</button>
        `;
        container.appendChild(div);
    });

    localStorage.setItem("clientesGold", JSON.stringify(clientesGold));
}

// ✏️ Edita nome do cliente
function editarNome(index, novoNome) {
    clientesGold[index].nome = novoNome;
    atualizarLista();
}

// 📅 Edita data de início do Gold
function editarData(index, novaData) {
    clientesGold[index].inicio = novaData;
    atualizarLista();
}

// ❌ Remove cliente da lista
function removerCliente(index) {
    clientesGold.splice(index, 1);
    atualizarLista();
}

// ➕ Adiciona novo cliente Gold
document.getElementById("adicionar").addEventListener("click", () => {
    clientesGold.push({ nome: "Novo Cliente", inicio: new Date().toISOString().split("T")[0] });
    atualizarLista();
});

// 🚀 Inicializa lista ao carregar página
atualizarLista();