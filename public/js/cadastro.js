document.getElementById("estado").addEventListener("change", function() {
    const estadoSelecionado = this.value;
    const cidadeSelect = document.getElementById("cidade");

    // Limpa opções anteriores
    cidadeSelect.innerHTML = '<option value="" disabled selected>Carregando cidades...</option>';

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
        .then(response => response.json())
        .then(data => {
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