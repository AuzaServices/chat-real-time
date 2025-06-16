const servicosProfissionais = {};

function adicionarServico(profissionalId, descricao, valor) {
    if (!servicosProfissionais[profissionalId]) {
        servicosProfissionais[profissionalId] = { servicos: [] };
    }
    servicosProfissionais[profissionalId].servicos.push({ descricao, valor });
    salvarServicos();
}

function salvarServicos() {
    localStorage.setItem("servicosProfissionais", JSON.stringify(servicosProfissionais));
}

function carregarServicos() {
    const dadosSalvos = localStorage.getItem("servicosProfissionais");
    if (dadosSalvos) {
        Object.assign(servicosProfissionais, JSON.parse(dadosSalvos));
    }
}

carregarServicos();