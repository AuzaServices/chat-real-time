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
  // Increment connection count and emit to all clients
  connectionsInfo.connections++;
  io.emit('ConnectionsInfo', connectionsInfo);

  // Emit previous messages to the connected client
  socket.emit('previousMessages', messages);

  // Listen for new messages and emit to all clients
  socket.on('sendMessage', (data) => {
    messages.push(data);
    io.emit('receivedMessage', data); // Sends message to all clients including the sender
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    connectionsInfo.connections--;
    io.emit('ConnectionsInfo', connectionsInfo);
  });
});

server.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});