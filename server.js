const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public")); // Pasta onde os arquivos do site estarão

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); // Carrega a página inicial
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});