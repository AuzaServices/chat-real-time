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
let connectionsInfo = {
  connections: 0
};

io.on('connection', socket => {

  connectionsInfo.connections = server.getConnections((err, count) => {
    if (err) throw err;
    return count;
  });
  
  socket.emit('ConnectionsInfo', connectionsInfo);
  socket.emit('previousMessages', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });

  // Desconectar o usuário
  socket.on('disconnectUser', () => {
    connectionsInfo.connections--;
    io.emit('ConnectionsInfo', connectionsInfo);
  });
});

server.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
