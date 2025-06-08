const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public")); // Serve os arquivos estáticos

// 🔥 Rota dinâmica para modificar meta tags do cadastro.html
app.get("/cadastro.html", (req, res) => {
    const modoPromocao = req.query.promo ? true : false;

    const metaTitle = modoPromocao ? "🔥 Promoção Especial · Indique e Ganhe!" : "Entre para o time Auza Services e começe a ter mais clientes.";
    const metaDescription = modoPromocao ? "💰 Cadastre-se e indique amigos para ganhar benefícios exclusivos!" : "Cadastre-se como profissional! 🛠️💇‍♂️🧱⚡";
    const metaImage = modoPromocao ? "https://i.imgur.com/PromoImagem.png" : "https://i.imgur.com/X2xHSm4.png";

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
            <title>${metaTitle}</title>
            <meta property="og:title" content="${metaTitle}">
            <meta property="og:description" content="${metaDescription}">
            <meta property="og:image" content="${metaImage}">
            <meta property="og:url" content="https://clientes2.onrender.com/cadastro.html${modoPromocao ? '?promo=true' : ''}">
            <link rel="stylesheet" href="css/cadastro.css">
            <script src="js/cadastro.js" defer></script>
        </head>
        <body>
            <div class="container">
                <h1>${modoPromocao ? "Promoção Especial!" : "Cadastro de Profissional"}</h1>
                <form id="cadastro-form">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required>
                    <label for="sobrenome">Sobrenome:</label>
                    <input type="text" id="sobrenome" name="sobrenome" required>
                    <button id="submit-button" type="submit">Continuar</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});