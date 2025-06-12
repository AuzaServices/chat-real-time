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
    host: "sql305.infinityfree.com",
    user: "if0_39218581",         
    password: "74141260314Lds", 
    database: "if0_39218581_cliques_db",
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
        console.error("🚨 Dados inválidos! profissionalId:", profissionalId, "nomeProfissional:", nomeProfissional);
        return res.status(400).send("Erro: Dados incompletos.");
    }

    const sql = `
        INSERT INTO cliques (profissional_id, nome_profissional, total)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE 
        total = total + 1, 
        nome_profissional = VALUES(nome_profissional);
    `;

    console.log("🚀 Query executada:", sql, "| Valores:", profissionalId, nomeProfissional);

    db.query(sql, [profissionalId, nomeProfissional], (err, results) => {
        if (err) {
            console.error("🚨 Erro ao registrar clique:", err);
            return res.status(500).send("Erro ao registrar clique.");
        }
        console.log("✅ Nome salvo no banco automaticamente!", results);
        res.sendStatus(200);
    });

    // ✅ Confirma a transação após a query
    db.query("COMMIT", (err) => {
        if (err) {
            console.error("🚨 Erro ao confirmar transação:", err);
        } else {
            console.log("✅ Transação confirmada!");
        }
    });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});