import app from './app.js';
//const server = require("http").Server(app);
//const io = require("socket.io")(server);
const mqtt = require('mqtt');

// Puerto de escucha servidor
let port = 24173 || process.env.PORT;
app.listen(port, () => {
    console.log("server is running in port " + port);
});
/*
let arrayClients = [];
let filter = [];
      
io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado por websocket");
  let arrayClientsFiltered = [];
  socket.on('filtereds', (filtro) => {
    filter = filtro;
    console.log('Filtro recibido!');
    console.log('filter connection: ' +JSON.stringify(filter));    
    arrayClientsFiltered = arrayClients.filter((item) => item.firma == filter[0] && item.sucursal == filter[1] /* && item.department == filter[2]);
    //console.log('arrayClients connection: '+JSON.stringify(arrayClientsFiltered));
    setTimeout(() => {
      io.sockets.emit("conectedScales", arrayClientsFiltered);
    }, 500);    
  });
});
*/    

const mosca = require('mosca')
const broker = new mosca.Server({
    port: 9000,
    retain: false
})
broker.on('ready', () => {
    console.log('Broker está listo!');
});


let id = {
    firma: 'firma',
    sucursal: 'sucursal',
    department: 'depto',
    name: 'brokerMQTT',
    wildcard: 'wilcard'
};

const opts = {
    clientId: JSON.stringify(id),
    clean: false,
    protocolId: 'MQTT',
    protocolVersion: 4
};

const clientMQTT = mqtt.connect('mqtt://localhost:9000');

/*
broker.on('clientConnected', (client) => {
    //let dataClient = JSON.parse(client);
    //let nombre = dataClient[0].id.name;
    //let arrayClientsFiltered = [];
    console.log('Nueva balanza conectada ');
    
    arrayClients.push(dataClient);
    if (filter.length > 0) {
      //console.log('filter clientConnected: '+JSON.stringify(filter));
      arrayClientsFiltered = arrayClients.filter((item) => item.firma == filter[0] && item.sucursal == filter[1] /* && item.department == filter[2]);      //console.log('Array clientConnected: '+JSON.stringify(arrayClients));
      setTimeout(() => {
        io.sockets.emit("conectedScales", arrayClientsFiltered);
      }, 500);
    }
                 
});
*/
broker.on('clientConnected', (client) => {
  let Client = client.id.split('{');
  if (Client.length > 1) {
    console.log('clientConnected: '+JSON.parse(client.id).name);
  } else {
    console.log('clientConnected: '+client.id);
  }  
  clientMQTT.publish(`mqtt/demo/connected/res`, `${client.id}`, {qos: 1, retain: true});                    
});
/*
broker.on('clientDisconnected', (client) => { 
//    let dataClient = JSON.parse(client.id);
    console.log('Se desconectó una balanza');
    
    let clientDisconnect = dataClient.name;
    let arrayClientsFiltered = [];
    arrayClients = arrayClients.filter((item) => item.name != clientDisconnect);
    if (filter.length > 0) {
      //console.log('filter clientDisconnected: '+JSON.stringify(filter));
      arrayClientsFiltered = arrayClients.filter((item) => item.firma == filter[0] && item.sucursal == filter[1] /* && item.department == filter[2]);      //console.log('Array clientDisconnected: '+JSON.stringify(arrayClients));
      setTimeout(() => {
        io.sockets.emit("conectedScales", arrayClientsFiltered);
      }, 500);
    }
                
});
*/
broker.on('clientDisconnected', (client) => {
  let Client = client.id.split(',');
  if (Client.length > 1) {
    console.log('clientDisconnected: '+JSON.parse(client.id).name);
  } else {
    console.log('clientDisconnected: '+client.id);
  }
  clientMQTT.publish(`mqtt/demo/disconnected/res`, `${client.id}`, {qos: 1, retain: true});                   
});