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
    user: "sql10785803",
    password: "841dAKRziR",
    database: "sql10785803",
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
        dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        whatsappCliente VARCHAR(20)  -- 💬 Aqui entra o número do cliente
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
const ipsIgnorados = ["132.255.107.153"]; // Pode adicionar mais IPs conforme necessário

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
  INSERT INTO trafego (pagina, acessos, data)
  VALUES (?, 1, NOW())
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
// 📌 Rota: registrar clique
app.post("/api/click", (req, res) => {
  const {
    profissionalId,
    nomeProfissional,
    profissao,
    dataHora,
    whatsappCliente // 🆕 captura o número do cliente
  } = req.body;

  const ipLimpo = obterIp(req);

  if (ipsIgnorados.includes(ipLimpo)) {
    console.log(`🔕 Clique ignorado do IP: ${ipLimpo}`);
    return res.json({ message: "✅ Clique ignorado (IP bloqueado)" });
  }

  if (!profissionalId || !nomeProfissional || !profissao) {
    return res.status(400).json({ error: "🚨 Dados obrigatórios ausentes!" });
  }

  // ✅ Garante dataHora em formato compatível com MySQL
  let dataHoraFinal;
  try {
    if (dataHora && typeof dataHora === "string") {
      const parsed = new Date(dataHora);
      if (!isNaN(parsed)) {
        dataHoraFinal = parsed.toISOString().slice(0, 19).replace("T", " ");
      }
    }
    if (!dataHoraFinal) {
      dataHoraFinal = new Date().toISOString().slice(0, 19).replace("T", " ");
    }
  } catch (err) {
    dataHoraFinal = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

const sql = `
  INSERT INTO cliques (
    profissional_id,
    \`Profissional\`,
    \`Profissão\`,
    Chamadas,
    \`dataHora\`,
    whatsappCliente
  )
  VALUES (?, ?, ?, 1, ?, ?);
`;

  db.query(
    sql,
    [profissionalId, nomeProfissional, profissao, dataHoraFinal, whatsappCliente],
    (err) => {
      if (err) {
        console.error("🚨 Erro ao registrar clique:", err);
        return res.status(500).json({ error: "Erro ao registrar clique" });
      }

      res.json({ message: "✅ Clique computado com sucesso!" });
    }
  );
});

// Rota: retornar dados
app.get("/api/dados", (req, res) => {
  const sqlCliques = `
    SELECT profissional_id, Profissional, Profissão, Chamadas, dataHora, whatsappCliente
    FROM cliques
    ORDER BY dataHora DESC
  `;

  const sqlTrafego = `
    SELECT pagina, acessos, data
    FROM trafego
    ORDER BY data DESC
  `;

  db.query(sqlCliques, (errCliques, resultadoCliques) => {
    if (errCliques) {
      console.error("❌ Erro ao carregar cliques:", errCliques);
      return res.status(500).json({ error: "Erro ao buscar dados de cliques" });
    }

    db.query(sqlTrafego, (errTrafego, resultadoTrafego) => {
      if (errTrafego) {
        console.error("❌ Erro ao carregar tráfego:", errTrafego);
        return res.status(500).json({ error: "Erro ao buscar dados de tráfego" });
      }

      res.json({
        cliques: resultadoCliques,
        trafego: resultadoTrafego
      });
    });
  });
});



// Página inicial
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});



// 📋 Criar tabela ServicosValor
const criarTabelaServicos = `
    CREATE TABLE IF NOT EXISTS ServicosValor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profissional_id INT NOT NULL,
        profissional_nome VARCHAR(255) NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        valor DECIMAL(10,2) NOT NULL,
        data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

db.query(criarTabelaServicos, (err) => {
    if (err) console.error("🚨 Erro ao criar tabela 'ServicosValor':", err);
    else console.log("✅ Tabela 'ServicosValor' criada/verificada.");
});

// 📌 Rota: Salvar serviço no banco
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

// 📌 Rota: Listar serviços para exibição no painel
app.get("/api/listar-servicos", (req, res) => {
    const sql = "SELECT id, descricao, valor, profissional_nome, data_registro FROM ServicosValor ORDER BY data_registro DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Erro ao buscar serviços:", err);
            return res.status(500).json({ error: "Erro ao listar serviços" });
        }

        res.json(results); // Agora retorna corretamente `profissional_nome`
    });
});

// 🚀 Iniciar servidor
// Rotas amigáveis sem .html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/cadastro", (req, res) => {
    res.sendFile(__dirname + "/public/cadastro.html");
});

app.get("/splash", (req, res) => {
    res.sendFile(__dirname + "/public/splash.html");
});

// 🚀 Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});