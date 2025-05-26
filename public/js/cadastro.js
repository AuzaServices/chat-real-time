document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("estado").addEventListener("change", function() {
        const estadoSelecionado = this.value;
        const cidadeSelect = document.getElementById("cidade");

        // Confirma se o estado tem um valor válido
        if (!estadoSelecionado) {
            console.error("Nenhum estado selecionado!");
            return;
        }

        console.log(`Buscando cidades para o estado: ${estadoSelecionado}`); // 🔹 Verificação extra

        // Limpa opções anteriores
        cidadeSelect.innerHTML = '<option value="" disabled selected>Carregando cidades...</option>';

        // Faz a requisição à API do IBGE
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then(response => {
                if (!response.ok) throw new Error("Erro ao acessar a API do IBGE");
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos da API:", data); // 🔹 Verifica se os dados chegaram

                cidadeSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';
                data.forEach(municipio => {
                    const option = document.createElement("option");
                    option.value = municipio.nome;
                    option.textContent = municipio.nome;
                    cidadeSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar cidades:", error);
                cidadeSelect.innerHTML = '<option value="" disabled selected>Erro ao carregar cidades</option>';
            });
    });
});