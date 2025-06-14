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

// 🚀 Criar tabelas separadamente para evitar erro de sintaxe
const createTableTrafego = `
    CREATE TABLE IF NOT EXISTS trafego (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pagina VARCHAR(50) NOT NULL UNIQUE,
        acessos INT DEFAULT 1,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

const createTableCliques = `
    CREATE TABLE IF NOT EXISTS cliques (
        profissional_id INT PRIMARY KEY,
        Profissional VARCHAR(100),
        Profissão VARCHAR(100),
        Chamadas INT DEFAULT 1,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

db.query(createTableTrafego, (err) => {
    if (err) console.error("🚨 Erro ao criar tabela `trafego`:", err);
    else console.log("✅ Tabela `trafego` pronta!");
});

db.query(createTableCliques, (err) => {
    if (err) console.error("🚨 Erro ao criar tabela `cliques`:", err);
    else console.log("✅ Tabela `cliques` pronta!");
});

// 📌 Rota para registrar acessos às páginas
app.post("/api/trafego", (req, res) => {
    const { pagina } = req.body;

    if (!pagina) {
        console.error("🚨 Página não informada!");
        return res.status(400).json({ error: "🚨 Página não informada!" });
    }

    const sql = `
        INSERT INTO trafego (pagina, acessos) 
        VALUES (?, 1) 
        ON DUPLICATE KEY UPDATE acessos = acessos + 1;
    `;

    db.query(sql, [pagina], (err, result) => {
        if (err) {
            console.error("❌ Erro ao registrar acesso no banco:", err);
            return res.status(500).json({ error: "Erro ao registrar acesso no banco" });
        }

        console.log(`✅ Banco atualizado: ${pagina}, acessos +1`);
        res.json({ message: "✅ Acesso registrado!" });
    });
});

// 📲 Rota para registrar cliques no botão de WhatsApp
app.post("/api/click", (req, res) => {
    const { profissionalId, nomeProfissional, profissao } = req.body;

    if (!profissionalId || !nomeProfissional || !profissao) {
        return res.status(400).json({ error: "🚨 Dados incompletos!" });
    }

    const sql = `
        INSERT INTO cliques (profissional_id, Profissional, Profissão, Chamadas)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE Chamadas = Chamadas + 1, Profissão = VALUES(Profissão);
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

// 📌 Rota para buscar dados das tabelas `trafego` e `cliques`
app.get("/api/dados", (req, res) => {
    const sqlTrafego = "SELECT pagina, acessos, data FROM trafego ORDER BY data DESC";
    const sqlCliques = "SELECT Profissional, Profissão, Chamadas FROM cliques ORDER BY Chamadas DESC";

    db.query(sqlTrafego, (errTrafego, trafegoResults) => {
        if (errTrafego) {
            console.error("❌ Erro ao buscar dados da tabela Trafego:", errTrafego);
            return res.status(500).json({ error: "Erro ao buscar dados da tabela Trafego" });
        }

        db.query(sqlCliques, (errCliques, cliquesResults) => {
            if (errCliques) {
                console.error("❌ Erro ao buscar dados da tabela Cliques:", errCliques);
                return res.status(500).json({ error: "Erro ao buscar dados da tabela Cliques" });
            }

            res.json({ trafego: trafegoResults, cliques: cliquesResults });
        });
    });
});

// Página principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// 📌 Rota para apagar os dados das tabelas
app.delete("/api/limpar", async (req, res) => {
    try {
        await db.promise().query("DELETE FROM trafego");
        await db.promise().query("DELETE FROM cliques");
        console.log("✅ Todas as tabelas foram limpas!");
        res.json({ message: "✅ Dados apagados com sucesso!" });
    } catch (error) {
        console.error("❌ Erro ao limpar tabelas:", error);
        res.status(500).json({ error: "Erro ao limpar tabelas" });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});