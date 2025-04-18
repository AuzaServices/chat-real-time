const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression'); // Importando o middleware de compressão
const morgan = require('morgan'); // Importando o morgan para logs

const { join } = path;

const port = process.env.PORT || 4000;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  },
  perMessageDeflate: {
    threshold: 1024, // Comprime apenas mensagens acima de 1KB
  }
});

app.use(compression()); // Habilitando a compressão
app.use(morgan('dev')); // Habilitando logs com morgan
app.use(express.static(join(__dirname, 'public')));
app.set('views', join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

let messages = [];
let connectionsInfo = {
  connections: 0
};

io.on('connection', socket => {
  server.getConnections((err, count) => {
    if (err) throw err;
    connectionsInfo.connections = count;
    socket.emit('ConnectionsInfo', connectionsInfo);
  });

  socket.emit('previousMessages', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });

  socket.on('clearMessages', () => {
    messages = [];
    io.emit('clearMessages');
  });
});

server.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});