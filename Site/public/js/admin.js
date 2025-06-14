document.addEventListener("DOMContentLoaded", async () => {
    // Teste de botão (Apenas para registro de tráfego e cliques)
    const botaoRegistrarClique = document.getElementById("btn-click");
    if (!botaoRegistrarClique) {
        console.error("❌ Botão 'Registrar Clique' não encontrado! Confirme o ID no HTML.");
        return;
    }

    botaoRegistrarClique.addEventListener("click", async () => {
        console.log("🖱️ Botão 'Registrar Clique' foi clicado!");

        try {
            const response = await fetch("/api/click", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profissionalId: 1,
                    nomeProfissional: "João Silva",
                    profissao: "Designer"
                })
            });

            const resultado = await response.json();

            if (response.ok) {
                alert(resultado.message);
                console.log("✅ Clique registrado com sucesso!");
            } else {
                alert("❌ Erro ao registrar clique: " + resultado.error);
                console.error("❌ Erro na resposta da API:", resultado.error);
            }
        } catch (error) {
            console.error("❌ Erro ao conectar com a API:", error);
            alert("❌ Erro ao tentar registrar o clique!");
        }
    });

    // Registro de tráfego automático ao carregar a página
    try {
        const response = await fetch("/api/trafego", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pagina: "Página Inicial" })
        });

        const resultado = await response.json();
        console.log("📊 Registro de tráfego:", resultado.message);
    } catch (error) {
        console.error("❌ Erro ao registrar tráfego:", error);
    }
});