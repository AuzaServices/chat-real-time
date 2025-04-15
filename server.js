const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const messages = []; // Array para armazenar mensagens

io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    // Enviar mensagens anteriores ao novo usuário
    socket.emit('previousMessages', messages);

    // Escutar mensagens enviadas por um cliente
    socket.on('sendMessage', (data) => {
        messages.push(data); // Armazena a mensagem
        io.emit('receivedMessage', data); // Envia a mensagem para todos os clientes conectados
    });

    // Monitorar desconexões
    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});