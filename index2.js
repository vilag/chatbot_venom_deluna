// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const mysql = require('mysql')
var estatus = 0;
var estatus_kinder = 0;
var estatus_primaria = 0;
var estatus_secundaria = 0;
var idescuela = 0;
var usuario_remoto = 0;





// conection.query("INSERT INTO usuarios_remotos (numero,estatus) VALUES ('3332','1')", (err, rows) =>{
//   if(err) throw err
  
// })



















venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {

  client.onMessage((message) => {
     if (message.body === 'Menu' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Hola!!! Gracias por comunicarte a *Uniformes De Luna*. Te recordamos que nuestro horario de atención es de lunes a viernes de 9:00am a 5:00pm.\n\nPor favor escribe el numero de la opción deseada:\n\n*1.* - Kinder\n*2.* - Primaria\n*3.* - Secundaria')
        .then((result) => {
          console.log('Result: ', result.to.remote.user); //return object success
          estatus = 1;
          usuario_remoto = result.to.remote.user;
         
          insertdb();
          

          




        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
     }

     //if (estatus<3) {
      
     
     
        if (message.body === '1' && estatus==1) {
            var tipo_escuela = "Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela, o escriba *Menu principal* para volver a seleccionar";
            client
            .sendText(message.from, tipo_escuela)
            .then((result) => {
            console.log('Result: ', result); //return object success
            estatus_kinder = 1;
            estatus_primaria = 0;
            estatus_secundaria = 0;
            estatus=2;
            })
            .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
            });
        }else{
            if (message.body === '2' && estatus==1) {
                var tipo_escuela = "Has seleccionado *Primaria*, por favor ingresa el nombre de la escuela, o escriba *Menu principal* para volver a seleccionar";
                client
                .sendText(message.from, tipo_escuela)
                .then((result) => {
                console.log('Result: ', result); //return object success
                estatus_kinder = 0;
                estatus_primaria = 1;
                estatus_secundaria = 0;
                estatus=2;
                })
                .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
                });
            }else{
                if (message.body === '3' && estatus==1) {
                    var tipo_escuela = "Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela, o escriba *Menu principal* para volver a seleccionar";
                    client
                    .sendText(message.from, tipo_escuela)
                    .then((result) => {
                    console.log('Result: ', result); //return object success
                    estatus_kinder = 0;
                    estatus_primaria = 0;
                    estatus_secundaria = 1;
                    estatus=2;
                    })
                    .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    });
                }else{
                    if (estatus===1) {
                        client
                        .sendText(message.from, 'Por favor escribe el numero de la opción deseada:\n\n*1.* - Kinder\n*2.* - Primaria\n*3.* - Secundaria')
                        .then((result) => {
                        console.log('Result: ', result); //return object success
                        estatus_kinder = 0;
                        estatus_primaria = 0;
                        estatus_secundaria = 0;
                        estatus=1;
                        })
                        .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                        });
                    }

                    
                }
            }
        }







        if ((message.body==='Citla' && estatus_kinder === 1 && estatus===2) || 
        (message.body==='Citlaltzintli' && estatus_kinder === 1 && estatus===2) || 
        (message.body==='Kinder Citlaltzintli' && estatus_kinder === 1 && estatus===2)) {
            client
            .sendText(message.from, '¿Usted quiso decir “Kinder Citlaltzintli”?\n\n*1.* - Si\n*2.* - No')
            .then((result) => {
            console.log('Result: ', result); //return object success
            estatus_kinder = 1;
            estatus_primaria = 0;
            estatus_secundaria = 0;
            estatus=3;
            idescuela=1;
            })
            .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
            });
        }else{
            if (estatus_kinder === 1 && estatus===2) {
                        client
                        .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela, o escriba *Menu principal* para volver a seleccionar.')
                        .then((result) => {
                        console.log('Result: ', result); //return object success
                        estatus_kinder = 1;
                        estatus_primaria = 0;
                        estatus_secundaria = 0;
                        estatus=2;
                        })
                        .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                        });
            }
        }
        if (message.body==='1' && estatus===3 && estatus_kinder===1 && idescuela===1 ) {
            client
            .sendText(message.from, '*“Kinder Citlaltzintli”*\n\n¿Que información desea consultar?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación')
            .then((result) => {
            console.log('Result: ', result); //return object success
            estatus_kinder = 1;
            estatus_primaria = 0;
            estatus_secundaria = 0;
            estatus=4;
            })
            .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
            });
        }else{
          if (estatus===3 && estatus_kinder===1) {
            client
            .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela, o escriba *Menu principal* para volver a seleccionar.')
            .then((result) => {
            console.log('Result: ', result); //return object success
            estatus_kinder = 1;
            estatus_primaria = 0;
            estatus_secundaria = 0;
            estatus=2;
            })
            .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
            });
          }
        }
            if (message.body==='1' && estatus===4 && estatus_kinder===1 && idescuela===1) {
                client
                .sendImage(
                  message.from,
                  'https://res.cloudinary.com/ddcszcshl/image/upload/v1693206833/De%20Luna/Citlaltzintli/Precios_sk2lia.png',
                  'image-name',
                  'Lista de precios de *Kinder Citlaltzintli*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                )
                
                // .sendText(message.from, '*“Kinder Citlaltzintli”*\n\n¿Que información desea consultar?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación')
                .then((result) => {
                console.log('Result: ', result); //return object success
                estatus_kinder = 1;
                estatus_primaria = 0;
                estatus_secundaria = 0;
                estatus=4;
                })
                .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
                });
            }

            console.log(message.body);
            console.log(estatus);
            console.log(estatus_kinder);
            console.log(idescuela);
            console.log(usuario_remoto);
            if (message.body==='2' && estatus===4 && estatus_kinder===1 && idescuela===1) {
              console.log("Entra a 2");                 
              client
              .sendText(message.from, 'horarios_a')
              .then((result) => {
              console.log('Result: ', result); //return object success
              estatus_kinder = 1;
              estatus_primaria = 0;
              estatus_secundaria = 0;
              estatus=4;
              })
              .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
              });
            }



  });
}


function consulta1(){
  const conection = mysql.createConnection({
    host: 'srv366.hstgr.io',
    user: 'u690371019_deluna',
    password: '4ZaZ>]qkFOn#',
    database: 'u690371019_deluna'
})
conection.connect( (err) =>{
    if(err) throw err
    console.log('Conexion exitosa')
})
const consulta1 = "SELECT count(idusuario) as cant_estat FROM usuarios_remotos WHERE numero='"+usuario_remoto+"'"
conection.query(consulta1, (err, rows) =>{
  if(err) throw err
  console.log(rows[0].cant_estat);
})

conection.end()
}




function insertdb(){

  const conection = mysql.createConnection({
      host: 'srv366.hstgr.io',
      user: 'u690371019_deluna',
      password: '4ZaZ>]qkFOn#',
      database: 'u690371019_deluna'
  })

  conection.connect( (err) =>{
      if(err) throw err
      console.log('Conexion exitosa')
  })

  const consulta1 = "SELECT count(idusuario) as cant_estat FROM usuarios_remotos WHERE numero='"+usuario_remoto+"'"
  conection.query(consulta1, (err, rows) =>{
    if(err) throw err
    //console.log('Resultados');
    console.log(rows[0].cant_estat);
  })

  // const insertar1 = "INSERT INTO usuarios_remotos (numero,estatus) VALUES ('"+usuario_remoto+"','1')"
  //   conection.query(insertar1, (err, rows)=>{
  //   if(err) throw err
  // })

  conection.end()
}
