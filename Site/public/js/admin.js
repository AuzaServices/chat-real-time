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

// 🔄 Atualiza dados a cada 2 segundos
setInterval(carregarDados, 2000);
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

// 🔄 Recupera clientes Gold do localStorage
let clientesGold = JSON.parse(localStorage.getItem("clientesGold")) || [];

// 🔧 Atualiza a lista de AuzaGold na tela
function atualizarLista() {
    const container = document.getElementById("goldContainer");
    container.innerHTML = "";
    const hoje = new Date();

    clientesGold.forEach((cliente, index) => {
        const inicio = new Date(cliente.inicio);
        const diasCalculados = 30 - Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
        const diasRestantes = cliente.diasCustom !== undefined && cliente.diasCustom !== null
            ? cliente.diasCustom
            : Math.max(diasCalculados, 0);

        const div = document.createElement("div");
        div.className = "gold";
        div.innerHTML = `
            <input type="text" value="${cliente.nome}" onchange="editarNome(${index}, this.value)">
            <input type="date" value="${cliente.inicio}" onchange="editarData(${index}, this.value)">
            <input type="number" value="${diasRestantes}" onchange="editarDias(${index}, this.value)" min="0" max="999" title="Dias restantes">
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

// 📅 Edita data de início
function editarData(index, novaData) {
    clientesGold[index].inicio = novaData;
    atualizarLista();
}

// 📆 Edita dias restantes manualmente
function editarDias(index, novoValor) {
    const valor = parseInt(novoValor);
    if (isNaN(valor)) {
        clientesGold[index].diasCustom = null;
    } else {
        clientesGold[index].diasCustom = valor;
    }
    atualizarLista();
}

// ❌ Remove cliente
function removerCliente(index) {
    clientesGold.splice(index, 1);
    atualizarLista();
}

// ➕ Adiciona novo cliente Gold
document.getElementById("adicionar").addEventListener("click", () => {
    clientesGold.push({
        nome: "Novo Cliente",
        inicio: new Date().toISOString().split("T")[0],
        diasCustom: null
    });
    atualizarLista();
});

// 🚀 Inicializa lista ao carregar página
atualizarLista();

document.addEventListener("DOMContentLoaded", () => {
    const descricaoInput = document.getElementById("descricao");
    const valorInput = document.getElementById("valor");

    // 🔄 Verificar se os elementos existem antes de tentar acessá-los
    if (!descricaoInput || !valorInput) {
        console.error("🚨 Campos do serviço não encontrados no HTML!");
        return;
    }

    // ✏️ Adicionar evento para salvar serviço
    document.getElementById("adicionar-servico").addEventListener("click", () => {
        const descricao = descricaoInput.value;
        const valor = valorInput.value;

        if (!descricao || !valor) {
            console.error("🚨 Todos os campos são obrigatórios!");
            return;
        }

        fetch("https://clientes-fhfe.onrender.com/api/salvar-servico", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descricao: descricao, valor: valor })
        }).then(response => response.json())
          .then(data => console.log("✅ Serviço salvo com sucesso!", data))
          .catch(error => console.error("❌ Erro ao salvar serviço:", error));
    });

    console.log("✅ Script carregado e funcional!");
});

document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Captura os elementos da página
    const tabelaServicos = document.getElementById("tabela-servicos");

    if (!tabelaServicos) {
        console.error("🚨 Tabela de serviços não encontrada no HTML!");
        return;
    }

    // 🔄 Função para carregar serviços do banco de dados
    async function carregarServicos() {
        try {
            const response = await fetch("/api/listar-servicos");
            if (!response.ok) throw new Error("Erro ao carregar serviços");

            const data = await response.json();
            tabelaServicos.innerHTML = ""; // Limpa antes de adicionar novos dados

            data.forEach(servico => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${servico.descricao}</td>
                    <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                    <td>${servico.profissional_nome || "N/A"}</td>
                `;
                tabelaServicos.appendChild(row);
            });

            console.log("✅ Serviços carregados com sucesso!");
        } catch (error) {
            console.error("❌ Erro ao carregar serviços:", error);
        }
    }

    // 🔄 Atualiza a lista de serviços a cada 5 segundos
    setInterval(carregarServicos, 2000);
    carregarServicos();
});