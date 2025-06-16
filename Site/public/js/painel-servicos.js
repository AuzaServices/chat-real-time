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

document.getElementById("formServico").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página

    const urlParams = new URLSearchParams(window.location.search);
    const profissionalId = urlParams.get("id"); // Captura o ID do profissional
    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value;

fetch("https://clientes-fhfe.onrender.com/api/salvar-servico", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profissional_id: profissionalId, descricao: descricao, valor: valor })
})
    .then(response => response.json())
    .then(data => {
        alert("Serviço adicionado com sucesso!"); 
        document.getElementById("descricao").value = ""; 
        document.getElementById("valor").value = "";
    })
    .catch(error => console.error("Erro ao salvar serviço:", error));
});