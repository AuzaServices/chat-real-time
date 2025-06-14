console.log("✅ admin.js carregado!");

document.addEventListener("DOMContentLoaded", async () => {
    // Teste de botão
    const botaoLimpar = document.getElementById("btn-limpar");
    if (!botaoLimpar) {
        console.error("❌ Botão 'Limpar Dados' não encontrado! Confirme o ID no HTML.");
        return;
    }

    botaoLimpar.addEventListener("click", async () => {
        console.log("🗑️ Botão 'Limpar Dados' foi clicado!");

        if (confirm("⚠️ Tem certeza que deseja apagar TODOS os dados? Isso não pode ser desfeito!")) {
            try {
                const response = await fetch("/api/limpar", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });
                const resultado = await response.json();

                if (response.ok) {
                    alert(resultado.message);
                    console.log("✅ Dados apagados com sucesso!");
                    location.reload(); // 🔄 Atualiza a página para exibir as tabelas vazias
                } else {
                    alert("❌ Erro ao apagar dados: " + resultado.error);
                    console.error("❌ Erro na resposta da API:", resultado.error);
                }
            } catch (error) {
                console.error("❌ Erro ao conectar com a API:", error);
                alert("❌ Erro ao tentar apagar os dados!");
            }
        }
    });
});