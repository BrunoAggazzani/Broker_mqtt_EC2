import app from './app.js';
//const server = require("http").Server(app);
//const io = require("socket.io")(server);

// Puerto de escucha servidor
let port = 24173 || process.env.PORT;
app.listen(port, () => {
    console.log("server is running in port " + port);
});
/*  
io.on("connection", function (socket) {
  console.log("Balanza se ha conectado con Sockets");
  //socket.emit("messages", messages);
  socket.on("new-message", function (data) {
    console.log(data);
    console.log('Respondiendo a Balanza...');
    let messages = 'Cloud dice: Hola Cuora Neo!';
    io.sockets.emit("messages", messages);
  });
});
*/
const mosca = require('mosca');

const broker = new mosca.Server({
    port: 9000,
    retain: false
});

broker.on('ready', () => {
    console.log('Broker está listo!');
});

broker.on('clientConnected', (client) => {
    //console.log('Nueva balanza: ' + client.id);
});