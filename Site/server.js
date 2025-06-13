const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 3000;

// Middleware para arquivos estáticos e JSON
app.use(express.static("public"));
app.use(express.json());

// Conexão com o banco de dados MySQL
const db = mysql.createPool({
    host: "sql10.freesqldatabase.com",
    user: "sql10784497",
    password: "vXvEteTscU",
    database: "sql10784497",
    port: 3306
});

// Teste de conexão
db.getConnection((err, connection) => {
    if (err) {
        console.error("🚨 Erro ao conectar ao MySQL:", err);
    } else {
        console.log("✅ Conectado ao banco de dados MySQL!");
        connection.release();
    }
});

// 🚀 Criar tabela `trafego` se não existir
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS trafego (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pagina VARCHAR(50) NOT NULL UNIQUE,
        acessos INT DEFAULT 1,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

db.query(createTableQuery, (err) => {
    if (err) console.error("🚨 Erro ao criar tabela `trafego`:", err);
    else console.log("✅ Tabela `trafego` pronta!");
});

// 📌 Rota para registrar acessos às páginas
app.post("/api/trafego", (req, res) => {
    const { pagina } = req.body;

    if (!pagina) {
        return res.status(400).json({ error: "🚨 Página não informada!" });
    }

    const sql = `
        INSERT INTO trafego (pagina, acessos) 
        VALUES (?, 1) 
        ON DUPLICATE KEY UPDATE acessos = acessos + 1;
    `;

    db.query(sql, [pagina], (err) => {
        if (err) return res.status(500).json({ error: "Erro ao registrar acesso" });
        res.json({ message: "✅ Acesso registrado!" });
    });
});

// 📲 Rota para registrar cliques no botão de WhatsApp
app.post("/api/click", (req, res) => {
    const { profissionalId, nomeProfissional, profissao } = req.body;

    console.log("📌 Clique recebido → ID:", profissionalId, "| Nome:", nomeProfissional, "| Profissão:", profissao);

    if (!profissionalId || !nomeProfissional || !profissao) {
        return res.status(400).json({ error: "🚨 Dados incompletos!" });
    }

    const sql = `
        INSERT INTO cliques (profissional_id, \`Profissional\`, \`Profissão\`, \`Chamadas\`)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE  
            \`Chamadas\` = \`Chamadas\` + 1, 
            \`Profissão\` = VALUES(\`Profissão\`);
    `;

    db.query(sql, [profissionalId, nomeProfissional, profissao], (err) => {
        if (err) {
            console.error("🚨 Erro ao registrar clique:", err);
            return res.status(500).json({ error: "Erro ao registrar clique" });
        }

        console.log("✅ Clique registrado ou atualizado com sucesso!");
        res.json({ message: "✅ Clique computado com sucesso!" });
    });
});

// Página principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});