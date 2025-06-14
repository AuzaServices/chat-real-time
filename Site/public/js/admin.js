document.addEventListener("DOMContentLoaded", async () => {
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

            console.log("✅ Dados carregados e exibidos na tabela!");
        }
    } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
    }
});