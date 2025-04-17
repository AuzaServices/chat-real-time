const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Porta definida pelo ambiente (Render) ou padrão 4000
const port = process.env.PORT || 4000;

// Criação do servidor HTTP e integração com o Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Configuração de diretórios estáticos e mecanismo de renderização
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Rota para servir a página principal
app.get('/', (req, res) => {
  res.render('index.html');
});

// Variáveis para mensagens e informações de conexão
let messages = [];
let connectionsInfo = {
  connections: 0,
};

// Evento de conexão do Socket.IO
io.on('connection', (socket) => {
  // Atualiza e envia o número de conexões ativas
  connectionsInfo.connections++;
  io.emit('ConnectionsInfo', connectionsInfo);

  // Envia mensagens anteriores ao cliente recém-conectado
  socket.emit('previousMessages', messages);

  // Evento para envio de mensagem
  socket.on('sendMessage', (data) => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });

  // Evento para limpar mensagens
  socket.on('clearMessages', () => {
    messages = [];
    io.emit('clearMessages');
  });

  // Atualiza o número de conexões ao desconectar
  socket.on('disconnect', () => {
    connectionsInfo.connections--;
    io.emit('ConnectionsInfo', connectionsInfo);
  });
});

// Inicialização do servidor
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});