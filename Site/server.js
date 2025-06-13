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

// Página principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
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

    db.query(sql, [profissionalId, nomeProfissional, profissao], (err, results) => {
        if (err) {
            console.error("🚨 Erro ao registrar clique:", err);
            return res.status(500).json({ error: "Erro ao registrar clique" });
        }

        console.log("✅ Clique registrado ou atualizado com sucesso!", results);
        res.json({ message: "✅ Clique computado com sucesso!" });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});