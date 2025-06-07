const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔥 Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// 🔥 Conectar ao banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'auza_services'
});

// 🔥 Buscar profissionais aprovados
app.get('/profissionais', (req, res) => {
    db.query("SELECT * FROM profissionais WHERE aprovado = 1", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 🔥 Cadastrar novo profissional
app.post('/cadastrar', (req, res) => {
    const { nome, idade, profissao, estado, cidade, experiencia } = req.body;
    db.query("INSERT INTO profissionais (nome, idade, profissao, estado, cidade, experiencia) VALUES (?, ?, ?, ?, ?, ?)", 
        [nome, idade, profissao, estado, cidade, experiencia], (err) => {
        if (err) throw err;
        res.json({ mensagem: "Cadastro enviado para aprovação!" });
    });
});

// 🔥 Aprovar profissional
app.post('/aprovar/:id', (req, res) => {
    db.query("UPDATE profissionais SET aprovado = 1 WHERE id = ?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ mensagem: "Profissional aprovado!" });
    });
});

// 🔥 Registrar acessos
app.post('/registrar-acesso', (req, res) => {
    db.query("INSERT INTO acessos (pagina, ip) VALUES (?, ?)", [req.body.pagina, req.ip], (err) => {
        if (err) throw err;
        res.json({ mensagem: "Acesso registrado!" });
    });
});

// 🔥 Servir o painel de administração
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// 🔥 Iniciar o servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));