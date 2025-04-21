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

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];
let connectionsInfo = { connections: 0 };

io.on('connection', (socket) => {
    // Incrementa o número de conexões e envia a informação para todos
    connectionsInfo.connections++;
    io.emit('ConnectionsInfo', connectionsInfo);

    // Envia mensagens anteriores para o cliente recém-conectado
    socket.emit('previousMessages', messages);

    // Escuta novas mensagens e envia para todos os clientes
    socket.on('sendMessage', (data) => {
        messages.push(data);
        io.emit('receivedMessage', data); // Envia para todos os clientes, incluindo o remetente
    });

    // Escuta o evento para limpar o chat
    socket.on('clearChat', () => {
        console.log('O chat será limpo para todos os usuários.');

        // Limpa as mensagens armazenadas no servidor
        messages = [];

        // Emite o evento 'clearChat' para todos os clientes conectados
        io.emit('clearChat'); // Notifica todos os usuários para limpar o chat
    });

    // Lida com desconexão
    socket.on('disconnect', () => {
        connectionsInfo.connections--;
        io.emit('ConnectionsInfo', connectionsInfo);
    });
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});