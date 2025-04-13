const express = require( 'express' )
const app = express()
const path = require( 'path' )

const { join } = path

const port = process.env.PORT || 4000
const server = require( 'http' ).createServer( app )
const io = require( 'socket.io' )( server )

app.use( express.static( join( __dirname , 'public' ) ) )
app.set( 'views' , join( __dirname , 'public' ) )
app.engine( 'html' , require('ejs').renderFile )
app.set( 'view engine' , 'html' )

app.use( '/' , ( req , res ) => {
  res.render( 'index.html' )
} )

let messages = []
let connectionsInfo = {
  connections: 0
}

io.on( 'connection' , socket => {

  connectionsInfo.connections = server.getConnections( ( err , count ) => {
    return count
  } )
  
  socket.emit( 'ConnectionsInfo' , connectionsInfo )
  socket.emit( 'previousMessages' , messages )

  socket.on( 'sendMessage' , data => {
    messages.push( data )
    socket.broadcast.emit( 'receivedMessage' , data )
  } )
} )

server.listen( port , () => {
  console.log( `Server running on localhost:${port}` )
} )
function renderConnectionsInfo() {
  // Altera o título para "Chat de Negociação" na cor Darkred
  const chatTitle = document.querySelector('#left-bar h2');
  if (chatTitle) {
      chatTitle.textContent = "Chat de Negociação";
      chatTitle.style.color = "darkred";
  }

  $('#online').html(`<h3><i class="fas fa-circle"></i> ${info.connected} Online</h3>`);
  $('#messages-received').html(`<h3 id="messages-received"><i class="fad fa-inbox-in"></i> ${info.numberMessages} ${info.numberMessages === 1 ? "Mensagem" : "Mensagens"}</h3>`);
}

// Remove os elementos "by Jefferson Calmon" e "Ver projeto" do HTML
function cleanCredits() {
  const creditsSection = document.querySelector('#credits');
  if (creditsSection) {
      creditsSection.remove();
  }
}

// Executa a limpeza ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  cleanCredits();
});