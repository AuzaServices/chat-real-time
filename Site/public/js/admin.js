document.addEventListener("DOMContentLoaded", async () => {
    const atualizarDados = async () => {
        try {
            const response = await fetch("/api/dados"); // 🔹 Busca os dados do banco
            const { trafego, cliques } = await response.json();

            // 🎯 Atualiza tabela de acessos (se existir na página)
            const tabelaTrafego = document.getElementById("tabela-trafego");
            if (tabelaTrafego) {
                tabelaTrafego.innerHTML = trafego.map(d => `
                    <tr>
                        <td>${d.pagina}</td>
                        <td>${d.acessos}</td>
                        <td>${new Date(d.data).toLocaleString()}</td>
                    </tr>
                `).join("");
            }

            // 🎯 Atualiza tabela de cliques (se existir na página)
            const tabelaCliques = document.getElementById("tabela-cliques");
            if (tabelaCliques) {
                tabelaCliques.innerHTML = cliques.map(c => `
                    <tr>
                        <td>${c.Profissional}</td>
                        <td>${c.Profissão}</td>
                        <td>${c.Chamadas}</td>
                    </tr>
                `).join("");
            }

        } catch (error) {
            console.error("❌ Erro ao buscar dados:", error);
        }
    };

    setInterval(atualizarDados, 10000); // 🔄 Atualiza a cada 10 segundos
    atualizarDados(); // 🔥 Executa ao carregar a página
});

document.getElementById("btn-limpar").addEventListener("click", async () => {
    if (confirm("⚠️ Tem certeza que deseja apagar TODOS os dados? Isso não pode ser desfeito!")) {
        try {
            const response = await fetch("/api/limpar", { method: "DELETE" });
            const resultado = await response.json();
            alert(resultado.message);
            location.reload(); // 🔄 Atualiza a página para exibir as tabelas vazias
        } catch (error) {
            console.error("❌ Erro ao limpar os dados:", error);
        }
    }
});