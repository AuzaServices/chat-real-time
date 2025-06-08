const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Servindo arquivos estáticos da pasta "public"
app.use(express.static("public"));

// Definindo o caminho do arquivo contador.json (fora da pasta public)
const arquivo = path.join(__dirname, "contador.json");

// Se o arquivo não existir, cria um novo com 0 acessos
if (!fs.existsSync(arquivo)) {
    fs.writeFileSync(arquivo, JSON.stringify({ acessos: 0 }));
}

// Função para atualizar o contador de acessos
function atualizarContador() {
    let dados = JSON.parse(fs.readFileSync(arquivo));
    dados.acessos++;
    fs.writeFileSync(arquivo, JSON.stringify(dados));
}

// Middleware que atualiza o contador toda vez que a página é acessada
app.use((req, res, next) => {
    atualizarContador();
    next();
});

// Servindo a página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`🔥 Servidor rodando em http://localhost:${port}`);
});