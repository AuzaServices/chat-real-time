const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const messages = []; // Array para armazenar mensagens enviadas

// Quando um cliente se conecta
io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    // Enviar mensagens anteriores ao novo cliente
    socket.emit('previousMessages', messages);

    // Escutar mensagens enviadas de um cliente
    socket.on('sendMessage', (data) => {
        messages.push(data); // Salva a mensagem no array
        io.emit('receivedMessage', data); // Envia a mensagem para todos os clientes conectados
    });

    // Monitorar desconexões
    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000; // Porta configurada para ambiente ou local
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});