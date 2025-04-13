const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let messages = [];

io.on('connection', (socket) => {
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', (data) => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});