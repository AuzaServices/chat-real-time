document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const profissionalId = parseInt(urlParams.get("id"));
    const profissionalNome = urlParams.get("nome");

    if (profissionalNome) {
        document.getElementById("profissionalNome").innerText = `Painel de Serviços - ${profissionalNome}`;
    }

    // Função para carregar serviços do localStorage
    function carregarServicos() {
        const dadosSalvos = localStorage.getItem("servicosProfissionais");
        return dadosSalvos ? JSON.parse(dadosSalvos) : {};
    }

    // Função para salvar serviços no localStorage
    function salvarServicos(servicos) {
        localStorage.setItem("servicosProfissionais", JSON.stringify(servicos));
    }

    // Função para atualizar a lista de serviços
    function atualizarServicos() {
        const servicos = carregarServicos();
        const servicosLista = document.getElementById("servicosLista");
        servicosLista.innerHTML = "";

        let totalValor = 0;

        if (servicos[profissionalId]) {
            servicos[profissionalId].forEach((servico, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${servico.descricao}</td>
                    <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                    <td><button onclick="removerServico(${index})">❌ Apagar</button></td>
                `;
                servicosLista.appendChild(row);
                totalValor += parseFloat(servico.valor);
            });
        }

        document.getElementById("totalValor").innerText = totalValor.toFixed(2);
        document.getElementById("taxa").innerText = (totalValor * 0.10).toFixed(2);
    }

    // Função para adicionar um serviço
    document.getElementById("formServico").addEventListener("submit", (event) => {
        event.preventDefault();

        const descricao = document.getElementById("descricao").value.trim();
        const valor = parseFloat(document.getElementById("valor").value);

        if (!descricao || isNaN(valor) || valor <= 0) {
            alert("Por favor, preencha todos os campos corretamente!");
            return;
        }

        const servicos = carregarServicos();

        // Garantir que servicos[profissionalId] seja um array
        if (!servicos[profissionalId] || !Array.isArray(servicos[profissionalId])) {
            servicos[profissionalId] = [];
        }

        servicos[profissionalId].push({ descricao, valor });
        salvarServicos(servicos);
        atualizarServicos();

        document.getElementById("formServico").reset();
    });

    // Função para remover um serviço
    window.removerServico = (index) => {
        const servicos = carregarServicos();

        if (servicos[profissionalId]) {
            servicos[profissionalId].splice(index, 1); // Remove o serviço pelo índice
            salvarServicos(servicos); // Atualiza o localStorage
            atualizarServicos(); // Atualiza a tabela
        }
    };

    atualizarServicos();
});