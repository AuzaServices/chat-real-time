function atualizarCidades() {
    const estadoSelecionado = document.getElementById("estado").value;
    const cidadeSelect = document.getElementById("cidade");

    // Limpa as opções anteriores
    cidadeSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';

    // Lista de cidades por estado (exemplo com algumas cidades de cada estado)
    const cidadesPorEstado = {
        "AC": ["Rio Branco", "Cruzeiro do Sul", "Senador Guiomard"],
        "AL": ["Maceió", "Arapiraca", "Palmeira dos Índios"],
        "AP": ["Macapá", "Santana", "Oiapoque"],
        "AM": ["Manaus", "Parintins", "Itacoatiara"],
        "BA": ["Salvador", "Feira de Santana", "Ilhéus"],
        "CE": ["Fortaleza", "Caucaia", "Maracanaú", "Horizonte"],
        "DF": ["Brasília"],
        "ES": ["Vitória", "Serra", "Vila Velha"],
        "GO": ["Goiânia", "Anápolis", "Rio Verde"],
        "MA": ["São Luís", "Imperatriz", "Caxias"],
        "MT": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
        "MS": ["Campo Grande", "Dourados", "Três Lagoas"],
        "MG": ["Belo Horizonte", "Uberlândia", "Juiz de Fora"],
        "PA": ["Belém", "Ananindeua", "Marabá"],
        "PB": ["João Pessoa", "Campina Grande", "Patos"],
        "PR": ["Curitiba", "Londrina", "Maringá"],
        "PE": ["Recife", "Caruaru", "Petrolina"],
        "PI": ["Teresina", "Parnaíba", "Picos"],
        "RJ": ["Rio de Janeiro", "Niterói", "Duque de Caxias"],
        "RN": ["Natal", "Mossoró", "Caicó"],
        "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
        "RO": ["Porto Velho", "Ji-Paraná", "Ariquemes"],
        "RR": ["Boa Vista", "Rorainópolis"],
        "SC": ["Florianópolis", "Joinville", "Blumenau"],
        "SP": ["São Paulo", "Campinas", "Santos"],
        "SE": ["Aracaju", "Lagarto", "Estância"],
        "TO": ["Palmas", "Araguaína", "Gurupi"]
    };

    if (cidadesPorEstado[estadoSelecionado]) {
        cidadesPorEstado[estadoSelecionado].forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
    }
}