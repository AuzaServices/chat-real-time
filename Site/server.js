const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

// Conexão com MySQL
const db = mysql.createPool({
    host: "sql10.freesqldatabase.com",
    user: "sql10784497",
    password: "vXvEteTscU",
    database: "sql10784497",
    port: 3306
});

// Testar conexão
db.getConnection((err, connection) => {
    if (err) {
        console.error("🚨 Erro ao conectar ao MySQL:", err);
    } else {
        console.log("✅ Conectado ao banco de dados MySQL!");
        connection.release();
    }
});

// Criar tabelas (trafego e cliques)
const criarTabelaTrafego = `
    CREATE TABLE IF NOT EXISTS trafego (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pagina VARCHAR(50) NOT NULL UNIQUE,
        acessos INT DEFAULT 1,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

const criarTabelaCliques = `
    CREATE TABLE IF NOT EXISTS cliques (
        profissional_id INT PRIMARY KEY,
        Profissional VARCHAR(100),
        Profissão VARCHAR(100),
        Chamadas INT DEFAULT 1,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

db.query(criarTabelaTrafego, (err) => {
    if (err) console.error("🚨 Erro ao criar tabela 'trafego':", err);
    else console.log("✅ Tabela 'trafego' criada/verificada.");
});

db.query(criarTabelaCliques, (err) => {
    if (err) console.error("🚨 Erro ao criar tabela 'cliques':", err);
    else console.log("✅ Tabela 'cliques' criada/verificada.");
});

// 🧱 Lista de IPs a serem ignorados
const ipsIgnorados = ["132.255.104.191"]; // Pode adicionar mais IPs conforme necessário

// 🛡️ Função utilitária para capturar IP real do usuário
function obterIp(req) {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    return ip?.trim().split(",")[0];
}

// Rota: registrar acessos
app.post("/api/trafego", (req, res) => {
    const { pagina } = req.body;
    const ipLimpo = obterIp(req);

    if (!pagina) {
        return res.status(400).json({ error: "Página não informada!" });
    }

    if (ipsIgnorados.includes(ipLimpo)) {
        console.log(`🔕 Tráfego ignorado do IP: ${ipLimpo}`);
        return res.json({ message: "✅ Acesso ignorado!" });
    }

    const sql = `
        INSERT INTO trafego (pagina, acessos)
        VALUES (?, 1)
        ON DUPLICATE KEY UPDATE acessos = acessos + 1;
    `;

    db.query(sql, [pagina], (err) => {
        if (err) {
            console.error("❌ Erro ao registrar acesso:", err);
            return res.status(500).json({ error: "Erro ao registrar acesso" });
        }

        res.json({ message: "✅ Acesso registrado!" });
    });
});

// Rota: registrar clique
app.post("/api/click", (req, res) => {
    const { profissionalId, nomeProfissional, profissao } = req.body;
    const ipLimpo = obterIp(req);

    if (ipsIgnorados.includes(ipLimpo)) {
        console.log(`🔕 Clique ignorado do IP: ${ipLimpo}`);
        return res.json({ message: "✅ Clique ignorado (IP bloqueado)" });
    }

    if (!profissionalId || !nomeProfissional || !profissao) {
        return res.status(400).json({ error: "🚨 Dados incompletos!" });
    }

    const sql = `
        INSERT INTO cliques (profissional_id, \`Profissional\`, \`Profissão\`, Chamadas)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE
            Chamadas = Chamadas + 1,
            \`Profissão\` = VALUES(\`Profissão\`);
    `;

    db.query(sql, [profissionalId, nomeProfissional, profissao], (err) => {
        if (err) {
            console.error("🚨 Erro ao registrar clique:", err);
            return res.status(500).json({ error: "Erro ao registrar clique" });
        }

        res.json({ message: "✅ Clique computado com sucesso!" });
    });
});

// Rota: retornar dados
app.get("/api/dados", (req, res) => {
    const sqlTrafego = "SELECT pagina, acessos, data FROM trafego ORDER BY data DESC";
    const sqlCliques = "SELECT Profissional, Profissão, Chamadas FROM cliques ORDER BY Chamadas DESC";

    db.query(sqlTrafego, (errTrafego, trafegoResults) => {
        if (errTrafego) {
            console.error("❌ Erro dados trafego:", errTrafego);
            return res.status(500).json({ error: "Erro ao buscar trafego" });
        }

        db.query(sqlCliques, (errCliques, cliquesResults) => {
            if (errCliques) {
                console.error("❌ Erro dados cliques:", errCliques);
                return res.status(500).json({ error: "Erro ao buscar cliques" });
            }

            res.json({ trafego: trafegoResults, cliques: cliquesResults });
        });
    });
});



// Página inicial
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Criar tabela ServicosValor
const criarTabelaServicos = `
    CREATE TABLE IF NOT EXISTS ServicosValor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profissional_id INT NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        valor DECIMAL(10,2) NOT NULL,
        data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

db.query(criarTabelaServicos, (err) => {
    if (err) console.error("🚨 Erro ao criar tabela 'ServicosValor':", err);
    else console.log("✅ Tabela 'ServicosValor' criada/verificada.");
});

// Rota: Salvar serviço no banco de dados
app.post("/api/salvar-servico", (req, res) => {
    const { profissional_id, profissional_nome, descricao, valor } = req.body;

    if (!profissional_id || !descricao || !valor || !profissional_nome) {
        return res.status(400).json({ error: "🚨 Todos os campos são obrigatórios!" });
    }

    const sql = "INSERT INTO ServicosValor (profissional_id, profissional_nome, descricao, valor) VALUES (?, ?, ?, ?)";
    db.query(sql, [profissional_id, profissional_nome, descricao, valor], (err) => {
        if (err) {
            console.error("🚨 Erro ao salvar serviço:", err);
            return res.status(500).json({ error: "Erro ao salvar serviço no banco" });
        }
        res.json({ message: "✅ Serviço salvo com sucesso!" });
    });
});

// Rota: Listar serviços cadastrados para exibição na admin.html
app.get("/api/listar-servicos", (req, res) => {
    const sql = "SELECT profissional_id, descricao, valor, data_registro FROM ServicosValor ORDER BY data_registro DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Erro ao buscar serviços:", err);
            return res.status(500).json({ error: "Erro ao listar serviços" });
        }

        // Vincular corretamente o nome do profissional ao serviço
        results.forEach(servico => {
            const profissional = profissionais.find(p => Number(p.id) === Number(servico.profissional_id));
            servico.profissional_nome = profissional ? profissional.nome : "Profissional não encontrado";
        });

        res.json(results);
    });
});

// Inicia servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
