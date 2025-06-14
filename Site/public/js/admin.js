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

// 🔄 Atualizar automaticamente a cada 5 segundos
setInterval(carregarDados, 2000);

// 🔥 Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDados);

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    body.classList.add("inicial");
    carregarDados();

    setTimeout(() => {
        body.classList.remove("inicial");
    }, 1000); // Remover classe após 1 segundo
});