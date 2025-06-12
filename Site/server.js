const express = require("express");
const mysql = require("mysql2"); 
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static("public"));

// Middleware para tratar JSON
app.use(express.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10784497",         
    password: "vXvEteTscU", 
    database: "sql10784497",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("🚨 Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("✅ Conectado ao banco de dados MySQL!");
});

// Rota principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// ✅ **Rota para registrar o clique do botão WhatsApp**

app.post("/api/click", (req, res) => {
    const { profissionalId, nomeProfissional } = req.body;

    console.log("📌 Debug → Profissional ID:", profissionalId, "| Nome:", nomeProfissional);

    if (!profissionalId || !nomeProfissional) {
        return res.status(400).json({ error: "🚨 Dados incompletos!" });
    }

    const sql = `
        INSERT INTO cliques (profissional_id, nome_profissional, total)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE 
        total = total + 1, 
        nome_profissional = VALUES(nome_profissional);
    `;

    db.query(sql, [profissionalId, nomeProfissional], (err, results) => {
        if (err) {
            console.error("🚨 Erro ao registrar clique:", err);
            return res.status(500).json({ error: "Erro ao registrar clique" });
        }
        console.log("✅ Nome salvo no banco automaticamente!", results);
        res.json({ message: "✅ Clique registrado com sucesso!" });
    });
});

// ✅ **Iniciar servidor**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});