/*
import app from '../app.js';
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mqtt = require('mqtt');

let arrayClients = [];
export const launchPage = (req, res) => {

      
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
    

    const mosca = require('mosca');

    const broker = new mosca.Server({
        port: 9000,
        retain: false
    });

    broker.on('ready', () => {
        console.log('Broker está listo!');
    });
    
    broker.on('clientConnected', (client) => {
        console.log('Nueva balanza conectada con ID: ' + client.id);
        arrayClients.push(client.id);
        //aca va socket        
    });

    broker.on('clientDisconnected', (client) => {
        console.log('Se desconectó la balanza con ID: ' + client.id);
        let cliente = client.id;
        arrayClients = arrayClients.filter((item) => item != cliente);
        //aca va socket        
    });
    setInterval(() => {//esto vuela. 
        console.log(arrayClients.length);
        if (arrayClients.length > 0) {
            arrayClients.map((e) =>{
                console.log(e);
            });
        }
    }, 5000);    
     
};



export const publish = (req, res) => {
    if (req.body){
        const data = req.body.data.toString();
        const balanza = req.body.balanza.toString();
        //res.render('home.ejs');    

        const pub = mqtt.connect('mqtt://localhost:9000');

        pub.on('connect', () => {
            if (balanza == '' || balanza == null){
                balanza = '*';
            }
            console.log('Pidiendo datos a balanza: '+balanza);
            pub.publish(`balanza/${balanza}/nombre`, data);        
        });
    }    
};
*/

    

