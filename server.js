const express = require('express');
const app = express();
const path = require('path');
const { join } = path;

const port = process.env.PORT || 4000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(join(__dirname, 'public')));
app.set('views', join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Rota principal para servir o arquivo HTML
app.use('/', (req, res) => {
    res.render('index.html');
});

// Armazena as mensagens e informações de conexões
let messages = [];
let connectionsInfo = { connections: 0 };

// Gerencia conexões Socket.IO
io.on('connection', (socket) => {
    // Incrementa o número de conexões e envia para todos
    connectionsInfo.connections++;
    io.emit('ConnectionsInfo', connectionsInfo);

    // Envia mensagens anteriores para o cliente recém-conectado
    socket.emit('previousMessages', messages);

    // Escuta novas mensagens do cliente
    socket.on('sendMessage', (data) => {
        const { author, message } = data;

        // Adiciona mensagem ao histórico
        messages.push({ author, message });

        // Envia para todos os clientes conectados
        io.emit('receivedMessage', { author, message });
    });

    // Lida com desconexões
    socket.on('disconnect', () => {
        connectionsInfo.connections--;
        io.emit('ConnectionsInfo', connectionsInfo);
    });
});

// Inicia o servidor na porta especificada
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});