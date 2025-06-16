document.addEventListener("DOMContentLoaded", async () => {
    async function carregarDados() {
        try {
            const response = await fetch("/api/dados");
            const dados = await response.json();

            if (dados.trafego && dados.cliques) {
                document.getElementById("tabela-trafego").innerHTML = dados.trafego.map(item => `
                    <tr>
                        <td>${item.pagina}</td>
                        <td>${item.acessos}</td>
                        <td>${item.data}</td>
                    </tr>
                `).join("");

                document.getElementById("tabela-cliques").innerHTML = dados.cliques.map(item => `
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

    // Atualiza dados a cada 2 segundos
    setInterval(carregarDados, 2000);
    carregarDados();

    // 🔐 Verifica senha antes de exibir painel
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

    document.getElementById("senha-container").addEventListener("keydown", (event) => {
        if (event.key === "Enter") verificarSenha();
    });

    // 📊 Carregar Serviços e Valores
    async function carregarServicos() {
        try {
            const response = await fetch("https://clientes-fhfe.onrender.com/api/listar-servicos");
            const data = await response.json();
            const tabelaServicos = document.getElementById("tabela-servicos");
            tabelaServicos.innerHTML = "";

            data.forEach(servico => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${servico.descricao}</td>
                    <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                    <td>${servico.profissional_nome}</td>
                `;
                tabelaServicos.appendChild(row);
            });

            console.log("✅ Serviços carregados com sucesso!");
        } catch (error) {
            console.error("❌ Erro ao carregar serviços:", error);
        }
    }

    carregarServicos();

    // 🏅 Controle dos Clientes AuzaGold
    let clientesGold = JSON.parse(localStorage.getItem("clientesGold")) || [];

    function atualizarListaGold() {
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

    function editarNome(index, novoNome) {
        clientesGold[index].nome = novoNome;
        atualizarListaGold();
    }

    function editarData(index, novaData) {
        clientesGold[index].inicio = novaData;
        atualizarListaGold();
    }

    function editarDias(index, novoValor) {
        const valor = parseInt(novoValor);
        clientesGold[index].diasCustom = isNaN(valor) ? null : valor;
        atualizarListaGold();
    }

    function removerCliente(index) {
        clientesGold.splice(index, 1);
        atualizarListaGold();
    }

    document.getElementById("adicionar").addEventListener("click", () => {
        clientesGold.push({
            nome: "Novo Cliente",
            inicio: new Date().toISOString().split("T")[0],
            diasCustom: null
        });
        atualizarListaGold();
    });

    atualizarListaGold();
});