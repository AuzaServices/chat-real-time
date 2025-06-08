const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Servindo arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Definindo o caminho do arquivo contador.json
const arquivo = path.join(__dirname, "contador.json");

// Criando contador.json se ele não existir
if (!fs.existsSync(arquivo)) {
    fs.writeFileSync(arquivo, JSON.stringify({ acessos: 0 }));
}

// Função para atualizar o contador e evitar erros de escrita/leitura
function atualizarContador() {
    try {
        console.log("🔄 Chamando atualizarContador()..."); // Log para ver se está sendo executado
        let dados = JSON.parse(fs.readFileSync(arquivo, "utf-8"));
        dados.acessos++;
        fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
        console.log(`✅ Acessos atualizados: ${dados.acessos}`);
    } catch (error) {
        console.error("❌ Erro ao atualizar contador:", error);
    }
}

// 🚀 **Agora o contador é atualizado SEMPRE que alguém acessa qualquer página**
app.use((req, res, next) => {
    atualizarContador(); // Atualiza o contador em todas as requisições
    next();
});

// Rota para servir `splash.html`
app.get("/", (req, res) => {
    atualizarContador(); // Agora o contador será chamado no splash.html
    res.sendFile(path.join(__dirname, "public", "splash.html"));
});

// Rota alternativa para verificar a atualização manual
app.get("/atualizar-contador", (req, res) => {
    atualizarContador();
    res.send("✅ Contador atualizado!");
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`🔥 Servidor rodando em http://localhost:${port}`);
});