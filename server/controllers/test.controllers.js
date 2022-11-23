const mqtt = require('mqtt');

let dataShowing = {mje: ''};

export const showing = async(req, res) => {
    //console.log('Una balanza se ha conectado');
    dataShowing = {mje: 'Balanza dijo: Hola, soy '+req.body.mje.toString()};
    console.log(dataShowing.mje);
    /*
    if (dataShowing.mje != '') {
        res
        .set("Content-Security-Policy", "script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        .render('home.ejs', {datos: dataShowing});
    }
    */
    
    /*
    let datos = JSON.parse(data);
    res.json(datos);
    
    .set("Content-Security-Policy", "script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render('home.ejs', {datos: dataShowing});
    */
   let info = JSON.stringify(dataShowing);
   res
   .set("Content-Security-Policy", "script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
   .send().json(info);
};



export const launchPage = (req, res) => {
    res
    .set("Content-Security-Policy", "script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render('home.ejs');
};



export const publish = (req, res, dataShowing) => {
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


    

