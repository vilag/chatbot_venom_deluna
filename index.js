// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const mysql = require('mysql')

let usuarios = [];


venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

//console.log(session);

function start(client) {

  client.onMessage((message) => {

      var numero_remoto = message.from.substring(0, message.from.length - 5);
      console.log("Numero de usuario remoto");
      console.log(numero_remoto);
      console.log(message.body);


        const conection2 = mysql.createConnection({
          host: 'srv366.hstgr.io',
          user: 'u690371019_deluna',
          password: '4ZaZ>]qkFOn#',
          database: 'u690371019_deluna'
          
        })
        conection2.connect( (err) =>{
            if(err) throw err
        })
        const consulta1_1 = "INSERT INTO mensajes_recibidos (detalle) VALUES ('"+message.body+"')"
        conection2.query(consulta1_1, (err, rows) =>{
          if(err) throw err 
        })
        conection2.end()


        const conection = mysql.createConnection({
          host: 'srv366.hstgr.io',
          user: 'u690371019_deluna',
          password: '4ZaZ>]qkFOn#',
          database: 'u690371019_deluna'
          
        })
        conection.connect( (err) =>{
            if(err) throw err
        })
        const consulta1 = "SELECT count(idusuario) as exist FROM usuarios_remotos WHERE numero='"+numero_remoto+"'"
        conection.query(consulta1, (err, rows) =>{
          if(err) throw err 
          //estatus_usuario = rows[0].estatus;
          numero_remoto = numero_remoto+rows[0].exist;
          console.log("Numero de usuario remoto + conteo_exist");
          console.log(numero_remoto);
        })
        conection.end()

        
        setTimeout(() => {
          console.log("Existe registro");
          console.log(numero_remoto.substr(13, 1));

          if (numero_remoto.substr(13, 1) == 0) {

            const conection = mysql.createConnection({
              host: 'srv366.hstgr.io',
              user: 'u690371019_deluna',
              password: '4ZaZ>]qkFOn#',
              database: 'u690371019_deluna'
            })
            conection.connect( (err) =>{
                if(err) throw err
            })
            var numero_remoto2 = numero_remoto.substring(0, 13);
            const insertar1 = "INSERT INTO usuarios_remotos (numero,estatus) VALUES ('"+numero_remoto2+"','0')"
              conection.query(insertar1, (err, rows)=>{
              if(err) throw err
            }) 
            conection.end()

          }
        }, 1000);
        
        setTimeout(() => {

            const conection = mysql.createConnection({
              host: 'srv366.hstgr.io',
              user: 'u690371019_deluna',
              password: '4ZaZ>]qkFOn#',
              database: 'u690371019_deluna'
            })
            conection.connect( (err) =>{
                if(err) throw err
            })
            var numero_remoto2 = numero_remoto.substring(0, 13);
            const consulta1 = "SELECT * FROM usuarios_remotos WHERE numero='"+numero_remoto2+"'"
            conection.query(consulta1, (err, rows) =>{
              if(err) throw err 
              var estatus_usuario = rows[0].estatus;
              var idusuario = rows[0].idusuario;
              // console.log("Numero");
              // console.log(numero_remoto2);
             // return;

                  if (estatus_usuario==0) {

                    //if (message.body === 'Menu' && message.isGroupMsg === false) {
                        client
                        .sendText(message.from, 'Hola!!! Gracias por comunicarte a *Uniformes De Luna*. Te recordamos que nuestro horario de atención es de lunes a viernes de 9:00am a 5:00pm.\n\nPor favor escribe el numero de la opción deseada:\n\n*1.* - Kinder\n*2.* - Primaria\n*3.* - Secundaria')
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                                if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=1 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        });
                    //}
                    
                  }


                  if (estatus_usuario==1) {
                    if (message.body === '1' && message.isGroupMsg === false){
                        client
                        .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        });
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                        .sendText(message.from, 'Has seleccionado *Primaria*, por favor ingresa el nombre de la escuela')
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=3 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        });
                    }
                    if (message.body === '3' && message.isGroupMsg === false){
                      client
                        .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        });
                    }
                    if (message.body != '1' && message.body != '2' && message.body != '3') {
                        client
                        .sendText(message.from, 'Por favor escribe el numero de la opción deseada:\n\n*1.* - Kinder\n*2.* - Primaria\n*3.* - Secundaria')
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                                if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=1 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        });
                    }
          
                  }
          
          
          
          
          
          
          
          
                  //Opciones para kinder Citlaltzintli
          
                  if (estatus_usuario==2) {
          
                    if ((message.body === 'Citla' && message.isGroupMsg === false) || 
                        (message.body === 'Kinder Citlaltzintli' && message.isGroupMsg === false) ||
                        (message.body === 'Citlaltzintli' && message.isGroupMsg === false) ||
                        (message.body === 'Preescolar Citlaltzintli' && message.isGroupMsg === false) ||
                        (message.body === 'Escuela Citlaltzintli' && message.isGroupMsg === false) ||
                        (message.body === 'Kinder citlaltzintli' && message.isGroupMsg === false) ||
                        (message.body === 'Preescolar citlaltzintli' && message.isGroupMsg === false) ||
                        (message.body === 'Escuela citlaltzintli' && message.isGroupMsg === false)
                    ) {
                      client
                      .sendText(message.from, '¿Usted quiso decir *Kinder Citlaltzintli*?\n\n*1.* - Si\n*2.* - No')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                              if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=5 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }else{
          
                      if ((message.body === 'Adolfo Christlieb Ibarola' && message.isGroupMsg === false) || 
                          (message.body === 'Adolfo Christlieb' && message.isGroupMsg === false) ||
                          (message.body === 'Christlieb Ibarola' && message.isGroupMsg === false) ||
                          (message.body === 'Christlieb' && message.isGroupMsg === false) ||
                          (message.body === 'Ibarola' && message.isGroupMsg === false) ||
                          (message.body === 'Adolfo christlieb ibarola' && message.isGroupMsg === false) ||
                          (message.body === 'Adolfo christlieb' && message.isGroupMsg === false) ||
                          (message.body === 'Kinder Adolfo Christlieb Ibarola' && message.isGroupMsg === false) ||
                          (message.body === 'Kinder adolfo christlieb ibarola' && message.isGroupMsg === false)
                      ) {
                        client
                        .sendText(message.from, '¿Usted quiso decir *Kínder “Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*?\n\n*1.* - Si\n*2.* - No')
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                                if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=10 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        });
          
                      }else{
                          
                        if ((message.body === 'Kinder Gorgonio Cortes Carrasco' && message.isGroupMsg === false) || 
                            (message.body === 'Kinder gorgonio cortes carrasco' && message.isGroupMsg === false) ||
                            (message.body === 'Kinder gorgonio cortes' && message.isGroupMsg === false) ||
                            (message.body === 'Kinder gorgonio' && message.isGroupMsg === false) ||
                            (message.body === 'Gorgonio Cortes Carrasco' && message.isGroupMsg === false) ||
                            (message.body === 'Gorgonio cortes carrasco' && message.isGroupMsg === false)
                        ) {
                          client
                          .sendText(message.from, '¿Usted quiso decir *Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*?\n\n*1.* - Si\n*2.* - No')
                          .then((result) => {
          
                              const conection = mysql.createConnection({
                                host: 'srv366.hstgr.io',
                                user: 'u690371019_deluna',
                                password: '4ZaZ>]qkFOn#',
                                database: 'u690371019_deluna'
                              })
                              conection.connect( (err) =>{
                                  if(err) throw err
                              })
                              const consulta1 = "UPDATE usuarios_remotos SET estatus=15 WHERE idusuario='"+idusuario+"'"
                              conection.query(consulta1, (err, rows) =>{
                                if(err) throw err 
                              })
                              conection.end()
          
                          })
                          .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                          });
          
                        }else{
                            
          
                          if ((message.body === 'Kinder Jose Luis Figueroa' && message.isGroupMsg === false) || 
                              (message.body === 'Kinder jose luis figueroa' && message.isGroupMsg === false) ||
                              (message.body === 'Kinder Jose Luis' && message.isGroupMsg === false) ||
                              (message.body === 'Jose Luis Figueroa' && message.isGroupMsg === false) ||
                              (message.body === 'Jose luis figueroa' && message.isGroupMsg === false) ||
                              (message.body === 'Luis figueroa' && message.isGroupMsg === false) ||
                              (message.body === 'Luis Figueroa' && message.isGroupMsg === false)
                          ) {
                            client
                            .sendText(message.from, '¿Usted quiso decir *Kínder “José Luis Figueroa” (Kínder Chulavista T/M)*?\n\n*1.* - Si\n*2.* - No')
                            .then((result) => {
          
                                const conection = mysql.createConnection({
                                  host: 'srv366.hstgr.io',
                                  user: 'u690371019_deluna',
                                  password: '4ZaZ>]qkFOn#',
                                  database: 'u690371019_deluna'
                                })
                                conection.connect( (err) =>{
                                    if(err) throw err
                                })
                                const consulta1 = "UPDATE usuarios_remotos SET estatus=20 WHERE idusuario='"+idusuario+"'"
                                conection.query(consulta1, (err, rows) =>{
                                  if(err) throw err 
                                })
                                conection.end()
          
                            })
                            .catch((erro) => {
                              console.error('Error when sending: ', erro); //return object error
                            });
          
                          }else{
                              
          
                            if ((message.body === 'Kinder Francisco Ruiz Sanchez' && message.isGroupMsg === false) || 
                                (message.body === 'Kinder Francisco Ruiz' && message.isGroupMsg === false) ||
                                (message.body === 'Kinder Francisco Ruiz' && message.isGroupMsg === false) ||
                                (message.body === 'Francisco Ruiz' && message.isGroupMsg === false) ||
                                (message.body === 'Kinder francisco ruiz sanchez' && message.isGroupMsg === false) ||
                                (message.body === 'Kinder francisco ruiz' && message.isGroupMsg === false) ||
                                (message.body === 'Francisco ruiz' && message.isGroupMsg === false)
                            ) {
                              client
                              .sendText(message.from, '¿Usted quiso decir *Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*?\n\n*1.* - Si\n*2.* - No')
                              .then((result) => {
          
                                  const conection = mysql.createConnection({
                                    host: 'srv366.hstgr.io',
                                    user: 'u690371019_deluna',
                                    password: '4ZaZ>]qkFOn#',
                                    database: 'u690371019_deluna'
                                  })
                                  conection.connect( (err) =>{
                                      if(err) throw err
                                  })
                                  const consulta1 = "UPDATE usuarios_remotos SET estatus=25 WHERE idusuario='"+idusuario+"'"
                                  conection.query(consulta1, (err, rows) =>{
                                    if(err) throw err 
                                  })
                                  conection.end()
          
                              })
                              .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                              });
          
                            }else{
                                client
                                .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
                                .then((result) => {
          
                                    const conection = mysql.createConnection({
                                      host: 'srv366.hstgr.io',
                                      user: 'u690371019_deluna',
                                      password: '4ZaZ>]qkFOn#',
                                      database: 'u690371019_deluna'
                                    })
                                    conection.connect( (err) =>{
                                      if(err) throw err
                                    })
                                    const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
                                    conection.query(consulta1, (err, rows) =>{
                                      if(err) throw err 
                                    })
                                    conection.end()
          
                                })
                                .catch((erro) => {
                                  console.error('Error when sending: ', erro); //return object error
                                });
                            }
                          }
          
                        }
          
          
          
          
                      }
          
                    }
          
                  }
          
                  if (estatus_usuario==3) {
          
                            if ((message.body === 'Primaria 24 de octubre' && message.isGroupMsg === false) || 
                                (message.body === 'Primaria 24 de Octubre' && message.isGroupMsg === false) ||
                                (message.body === 'primaria 24 de octubre' && message.isGroupMsg === false) ||
                                (message.body === '24 de octubre' && message.isGroupMsg === false) 
                            ) {
                              client
                              .sendText(message.from, '¿Usted quiso decir *Primaria 24 de octubre*?\n\n*1.* - Si\n*2.* - No')
                              .then((result) => {
          
                                  const conection = mysql.createConnection({
                                    host: 'srv366.hstgr.io',
                                    user: 'u690371019_deluna',
                                    password: '4ZaZ>]qkFOn#',
                                    database: 'u690371019_deluna'
                                  })
                                  conection.connect( (err) =>{
                                      if(err) throw err
                                  })
                                  const consulta1 = "UPDATE usuarios_remotos SET estatus=30 WHERE idusuario='"+idusuario+"'"
                                  conection.query(consulta1, (err, rows) =>{
                                    if(err) throw err 
                                  })
                                  conection.end()
          
                              })
                              .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                              });
          
                            }else{
                                client
                                .sendText(message.from, 'Has seleccionado *Primaria*, por favor ingresa el nombre de la escuela')
                                .then((result) => {
          
                                    const conection = mysql.createConnection({
                                      host: 'srv366.hstgr.io',
                                      user: 'u690371019_deluna',
                                      password: '4ZaZ>]qkFOn#',
                                      database: 'u690371019_deluna'
                                    })
                                    conection.connect( (err) =>{
                                      if(err) throw err
                                    })
                                    const consulta1 = "UPDATE usuarios_remotos SET estatus=3 WHERE idusuario='"+idusuario+"'"
                                    conection.query(consulta1, (err, rows) =>{
                                      if(err) throw err 
                                    })
                                    conection.end()
          
                                })
                                .catch((erro) => {
                                  console.error('Error when sending: ', erro); //return object error
                                });
                            }
                    
                  }
          
                  if (estatus_usuario==4) {
          
                            if ((message.body === 'Escuela Secundaria General #17 Jose Antonio Torres' && message.isGroupMsg === false) || 
                                (message.body === 'Escuela Secundaria General 17 Jose Antonio Torres' && message.isGroupMsg === false) ||
                                (message.body === 'Secundaria General 17 Jose Antonio Torres' && message.isGroupMsg === false) ||
                                (message.body === 'General 17 Jose Antonio Torres' && message.isGroupMsg === false) ||
                                (message.body === 'General 17' && message.isGroupMsg === false) ||
                                (message.body === 'Jose Antonio Torres' && message.isGroupMsg === false) ||
                                (message.body === 'Jose Antonio' && message.isGroupMsg === false)
                            ) {
                              client
                              .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria General #17 "Jose Antonio Torres"*?\n\n*1.* - Si\n*2.* - No')
                              .then((result) => {
          
                                  const conection = mysql.createConnection({
                                    host: 'srv366.hstgr.io',
                                    user: 'u690371019_deluna',
                                    password: '4ZaZ>]qkFOn#',
                                    database: 'u690371019_deluna'
                                  })
                                  conection.connect( (err) =>{
                                      if(err) throw err
                                  })
                                  const consulta1 = "UPDATE usuarios_remotos SET estatus=40 WHERE idusuario='"+idusuario+"'"
                                  conection.query(consulta1, (err, rows) =>{
                                    if(err) throw err 
                                  })
                                  conection.end()
          
                              })
                              .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                              });
          
                            }else{
                                
          
                              if ((message.body === 'Escuela Secundaria General #132 Carlos Gonzalez Peña' && message.isGroupMsg === false) || 
                                  (message.body === 'Escuela Secundaria General 132 Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
                                  (message.body === 'Secundaria General 132 Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
                                  (message.body === 'General 132 Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
                                  (message.body === 'General 132' && message.isGroupMsg === false) ||
                                  (message.body === 'Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
                                  (message.body === 'Carlos Gonzalez' && message.isGroupMsg === false) ||
                                  (message.body === '132 Carlos González peña' && message.isGroupMsg === false) ||
                                  (message.body === 'CARLOS GONZALEZ PEÑA' && message.isGroupMsg === false)
                              ) {
                                client
                                .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria General #132 “Carlos González Peña"*?\n\n*1.* - Si\n*2.* - No')
                                .then((result) => {
          
                                    const conection = mysql.createConnection({
                                      host: 'srv366.hstgr.io',
                                      user: 'u690371019_deluna',
                                      password: '4ZaZ>]qkFOn#',
                                      database: 'u690371019_deluna'
                                    })
                                    conection.connect( (err) =>{
                                        if(err) throw err
                                    })
                                    const consulta1 = "UPDATE usuarios_remotos SET estatus=45 WHERE idusuario='"+idusuario+"'"
                                    conection.query(consulta1, (err, rows) =>{
                                      if(err) throw err 
                                    })
                                    conection.end()
          
                                })
                                .catch((erro) => {
                                  console.error('Error when sending: ', erro); //return object error
                                });
          
                              }else{
                                  
                                if ((message.body === 'Escuela Secundaria General #64 Jesus Reyes Heroles' && message.isGroupMsg === false) || 
                                    (message.body === 'Escuela Secundaria General 64 Jesus Reyes Heroles' && message.isGroupMsg === false) ||
                                    (message.body === 'Secundaria General 64 Jesus Reyes Heroles' && message.isGroupMsg === false) ||
                                    (message.body === 'General 64 Jesus Reyes Heroles' && message.isGroupMsg === false) ||
                                    (message.body === 'General 64' && message.isGroupMsg === false) ||
                                    (message.body === 'Escuela Secundaria Jesus Reyes Heroles' && message.isGroupMsg === false) ||
                                    (message.body === 'Jesus Reyes Heroles' && message.isGroupMsg === false)
                                ) {
                                  client
                                  .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria General #64 “Jesús Reyes Heroles”*?\n\n*1.* - Si\n*2.* - No')
                                  .then((result) => {
          
                                      const conection = mysql.createConnection({
                                        host: 'srv366.hstgr.io',
                                        user: 'u690371019_deluna',
                                        password: '4ZaZ>]qkFOn#',
                                        database: 'u690371019_deluna'
                                      })
                                      conection.connect( (err) =>{
                                          if(err) throw err
                                      })
                                      const consulta1 = "UPDATE usuarios_remotos SET estatus=50 WHERE idusuario='"+idusuario+"'"
                                      conection.query(consulta1, (err, rows) =>{
                                        if(err) throw err 
                                      })
                                      conection.end()
          
                                  })
                                  .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                  });
          
                                }else{
                                    
                                  if ((message.body === 'Escuela Secundaria Mixta Foranea #10' && message.isGroupMsg === false) || 
                                      (message.body === 'Escuela Secundaria Mixta Foranea 10' && message.isGroupMsg === false) ||
                                      (message.body === 'Secundaria Mixta Foranea 10' && message.isGroupMsg === false) ||
                                      (message.body === 'Mixta Foranea 10' && message.isGroupMsg === false) ||
                                      (message.body === 'Secundaria Foranea 10' && message.isGroupMsg === false) ||
                                      (message.body === 'Foranea 10' && message.isGroupMsg === false) ||
                                      (message.body === 'Secundaria mixta foránea #10' && message.isGroupMsg === false) ||
                                      (message.body === 'Mixta foránea #10' && message.isGroupMsg === false) ||
                                      (message.body === 'Foránea #10' && message.isGroupMsg === false)
                                  ) {
                                    client
                                    .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria Mixta “Foránea #10”*?\n\n*1.* - Si\n*2.* - No')
                                    .then((result) => {
          
                                        const conection = mysql.createConnection({
                                          host: 'srv366.hstgr.io',
                                          user: 'u690371019_deluna',
                                          password: '4ZaZ>]qkFOn#',
                                          database: 'u690371019_deluna'
                                        })
                                        conection.connect( (err) =>{
                                            if(err) throw err
                                        })
                                        const consulta1 = "UPDATE usuarios_remotos SET estatus=55 WHERE idusuario='"+idusuario+"'"
                                        conection.query(consulta1, (err, rows) =>{
                                          if(err) throw err 
                                        })
                                        conection.end()
          
                                    })
                                    .catch((erro) => {
                                      console.error('Error when sending: ', erro); //return object error
                                    });
          
                                  }else{
                                      client
                                      .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela.')
                                      .then((result) => {
          
                                          const conection = mysql.createConnection({
                                            host: 'srv366.hstgr.io',
                                            user: 'u690371019_deluna',
                                            password: '4ZaZ>]qkFOn#',
                                            database: 'u690371019_deluna'
                                          })
                                          conection.connect( (err) =>{
                                            if(err) throw err
                                          })
                                          const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
                                          conection.query(consulta1, (err, rows) =>{
                                            if(err) throw err 
                                          })
                                          conection.end()
          
                                      })
                                      .catch((erro) => {
                                        console.error('Error when sending: ', erro); //return object error
                                      });
                                  }
          
          
                                }
          
                              }
          
                            }
                    
                  }
          
          
          
          
                  if (estatus_usuario==5) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=6 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==6){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693206833/De%20Luna/Citlaltzintli/Precios_sk2lia.png',
                        'image-name',
                        'Lista de precios de *Kinder Citlaltzintli*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=1 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=7 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=8 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=6 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==7) {
          
                      //if (message.body === '3' && message.isGroupMsg === false){
          
                          client
                          .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                          .then((result) => {
          
                              const conection = mysql.createConnection({
                                host: 'srv366.hstgr.io',
                                user: 'u690371019_deluna',
                                password: '4ZaZ>]qkFOn#',
                                database: 'u690371019_deluna'
                              })
                              conection.connect( (err) =>{
                                if(err) throw err
                              })
                              const consulta1 = "UPDATE usuarios_remotos SET estatus=9 WHERE idusuario='"+idusuario+"'"
                              conection.query(consulta1, (err, rows) =>{
                                if(err) throw err 
                              })
                              conection.end()
          
                          })
                          .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                          })
                        
                     // }
                    
                  }
          
          
          
          
          
          
          
          
          
          
                  if (estatus_usuario==10) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Kinder Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=11 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==11){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693421399/De%20Luna/Kinder%20Adolfo%20Christlieb%20Ibarola/Dise%C3%B1o_sin_t%C3%ADtulo_38_rvnuob.png',
                        'image-name',
                        'Lista de precios de *Kinder Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=2 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=12 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=13 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Kinder Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=11 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==12) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=14 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                   // }
                  
                  }
          
          
                  
          
          
          
          
          
          
          
          
                  if (estatus_usuario==15) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=16 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==16){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693428994/De%20Luna/Kinder%20Gorgonio%20Cortes%20Carrasco/Dise%C3%B1o_sin_t%C3%ADtulo_39_mwbcfq.png',
                        'image-name',
                        'Lista de precios de *Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=3 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=17 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=18 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=16 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==17) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=19 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                   // }
                  
                  }
          
          
          
          
          
          
          
          
          
                  
          
                  if (estatus_usuario==20) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Kínder “José Luis Figueroa” (Kínder Chulavista T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=21 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==21){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693429647/De%20Luna/K%C3%ADnder%20Jos%C3%A9%20Luis%20Figueroa/Dise%C3%B1o_sin_t%C3%ADtulo_40_zybgyv.png',
                        'image-name',
                        'Lista de precios de *Kínder “José Luis Figueroa” (Kínder Chulavista T/M)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=4 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=22 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=23 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*José Luis Figueroa (Kínder Chulavista T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=21 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==22) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=24 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                   // }
                  
                  }
          
          
          
          
          
          
          
          
          
          
          
                  if (estatus_usuario==25) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=26 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==26){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693430633/De%20Luna/Kinder%20Francisco%20Ruiz%20S%C3%A1nchez/Dise%C3%B1o_sin_t%C3%ADtulo_41_b2pu7l.png',
                        'image-name',
                        'Lista de precios de *Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=5 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=27 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=28 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=26 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==27) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=29 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                   // }
                  
                  }
          
          
          
          
          
          
          
          
          
          
          
          
          
                  if (estatus_usuario==30) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Primaria 24 de octubre*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=31 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Primaria*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=3 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==31){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1690962050/De%20Luna/Prim%2024%20de%20octubre/Primaria_Onu_onoem2.jpg',
                        'image-name',
                        'Lista de precios de *Primaria 24 de octubre*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=6 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=32 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=33 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Primaria 24 de octubre*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=31 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==32) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=34 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                   // }
                  
                  }
          
          
          
          
          
          
          
          
          
          
          
          
          
                  if (estatus_usuario==40) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Escuela Secundaria General #17 "Jose Antonio Torres"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=41 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==41){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693436407/De%20Luna/Sec%20General%2017/general_17_w7avqt.jpg',
                        'image-name',
                        'Lista de precios de *Escuela Secundaria General #17 "Jose Antonio Torres"*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=8 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=42 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=43 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Escuela Secundaria General #17 "Jose Antonio Torres"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=41 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==42) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=44 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                   // }
                  
                  }
          
          
          
          
          
          
          
          
          
          
          
          
                  if (estatus_usuario==45) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Escuela Secundaria General #132 “Carlos González Peña"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=46 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==46){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693437169/De%20Luna/Sec%20Gen%20132/Dise%C3%B1o_sin_t%C3%ADtulo_42_xli0ch.png',
                        'image-name',
                        'Lista de precios de *Escuela Secundaria General #132 “Carlos González Peña"*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=9 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=47 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=48 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Escuela Secundaria General #132 “Carlos González Peña"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=46 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==47) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=49 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                  
                  }
          
          
          
          
          
          
          
          
          
          
          
          
          
                  if (estatus_usuario==50) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Escuela Secundaria General #64 “Jesús Reyes Heroles”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=51 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==51){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1690962461/De%20Luna/Sec%20Gen%2064/Sec._Gral._64_y6iglv.jpg',
                        'image-name',
                        'Lista de precios de *Escuela Secundaria General #64 “Jesús Reyes Heroles”*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=10 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=52 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=53 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Escuela Secundaria General #64 “Jesús Reyes Heroles”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=51 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==52) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=54 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                  
                  }
          
          
          
          
          
          
          
          
          
          
          
          
                  if (estatus_usuario==55) {
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, '*Escuela Secundaria Mixta “Foránea #10”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=56 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
                    if (message.body === '2' && message.isGroupMsg === false){
                      client
                      .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                    }
                  }
          
                  if (estatus_usuario==56){
                    if (message.body === '1' && message.isGroupMsg === false){
          
                      client
                      .sendImage(
                        message.from,
                        'https://res.cloudinary.com/ddcszcshl/image/upload/v1693438858/De%20Luna/Sec%20Foranea%2010/Dise%C3%B1o_sin_t%C3%ADtulo_43_bcgoce.png',
                        'image-name',
                        'Lista de precios de *Escuela Secundaria Mixta “Foránea #10”*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
                      )
                      // .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                    }
          
                    if (message.body === '2' && message.isGroupMsg === false){
          
                      const conection = mysql.createConnection({
                        host: 'srv366.hstgr.io',
                        user: 'u690371019_deluna',
                        password: '4ZaZ>]qkFOn#',
                        database: 'u690371019_deluna'
                      })
                      conection.connect( (err) =>{
                          if(err) throw err
                      })
                      const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=11 ORDER BY iddetalle DESC LIMIT 1"
                      conection.query(consulta1, (err, rows) =>{
                        if(err) throw err 
                        fecha = rows[0].fecha;
                        hora1 = rows[0].hora1;
                        hora2 = rows[0].hora2;
                        detalle = rows[0].detalle;
                      })
                      conection.end()
          
                      setTimeout(() => {
          
                        var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
                        
                        client
                        .sendText(message.from, fecha_hora)
                        .then((result) => {
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      }, 1000);
                    }
          
                    if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=57 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '4' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
                        .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=58 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                      
                    }
          
                    if (message.body === '5' && message.isGroupMsg === false){
          
                      client
                      .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
                      .then((result) => {
          
                        const conection = mysql.createConnection({
                          host: 'srv366.hstgr.io',
                          user: 'u690371019_deluna',
                          password: '4ZaZ>]qkFOn#',
                          database: 'u690371019_deluna'
                        })
                        conection.connect( (err) =>{
                          if(err) throw err
                        })
                        const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
                        conection.query(consulta1, (err, rows) =>{
                          if(err) throw err 
                        })
                        conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      })
                    
                    }
          
                    if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {
          
                      client
                      .sendText(message.from, '*Escuela Secundaria Mixta “Foránea #10”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
                      .then((result) => {
          
                          const conection = mysql.createConnection({
                            host: 'srv366.hstgr.io',
                            user: 'u690371019_deluna',
                            password: '4ZaZ>]qkFOn#',
                            database: 'u690371019_deluna'
                          })
                          conection.connect( (err) =>{
                            if(err) throw err
                          })
                          const consulta1 = "UPDATE usuarios_remotos SET estatus=56 WHERE idusuario='"+idusuario+"'"
                          conection.query(consulta1, (err, rows) =>{
                            if(err) throw err 
                          })
                          conection.end()
          
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
          
                      
                    }
          
                  }
          
                  if (estatus_usuario==57) {
          
                    //if (message.body === '3' && message.isGroupMsg === false){
          
                        client
                        .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
                        .then((result) => {
          
                            const conection = mysql.createConnection({
                              host: 'srv366.hstgr.io',
                              user: 'u690371019_deluna',
                              password: '4ZaZ>]qkFOn#',
                              database: 'u690371019_deluna'
                            })
                            conection.connect( (err) =>{
                              if(err) throw err
                            })
                            const consulta1 = "UPDATE usuarios_remotos SET estatus=59 WHERE idusuario='"+idusuario+"'"
                            conection.query(consulta1, (err, rows) =>{
                              if(err) throw err 
                            })
                            conection.end()
          
                        })
                        .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                        })
                  
                  }




              
            })
            conection.end()
          
        }, 2000);

        
        
     


















      // var estatus_usuario;
      // var idusuario;
      // var fecha;
      // var hora1;
      // var hora2;
      // var detalle;
      
      // console.log(numero_remoto);
      // var usuario_encontrado = 0;


      // for (let index = 0; index < usuarios.length; index++) {
      //         var usuario_enc = usuarios[0];
      //         var usuario_encontrado=0;
      //         console.log(usuario_enc);
      //         if (usuario_enc==numero_remoto) {
      //           console.log("Encontrado");
      //           usuario_encontrado = 1;
      //         }else{
      //           if (usuario_encontrado==1) {
      //             console.log("Encontrado");
      //             usuario_encontrado = 1;
      //           }else{
      //             console.log("No Encontrado");
      //             usuario_encontrado = 0;
      //           }   
      //         }
      // }

      // if (usuario_encontrado==0) {
      //         usuarios.push(numero_remoto);
      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //             if(err) throw err
      //         })
      //         const insertar1 = "INSERT INTO usuarios_remotos (numero,estatus) VALUES ('"+numero_remoto+"','0')"
      //           conection.query(insertar1, (err, rows)=>{
      //           if(err) throw err
      //         }) 
      //         conection.end()
      // }

      // setTimeout(() => {        
      //   const conection = mysql.createConnection({
      //     host: 'srv366.hstgr.io',
      //     user: 'u690371019_deluna',
      //     password: '4ZaZ>]qkFOn#',
      //     database: 'u690371019_deluna'
      //   })
      //   conection.connect( (err) =>{
      //       if(err) throw err
      //   })
      //   const consulta1 = "SELECT * FROM usuarios_remotos WHERE numero='"+numero_remoto+"' ORDER BY idusuario DESC LIMIT 1"
      //   conection.query(consulta1, (err, rows) =>{
      //     if(err) throw err 
      //     estatus_usuario = rows[0].estatus;
      //     idusuario = rows[0].idusuario;

      //   })
      //   conection.end()
      // }, 1000);

      // setTimeout(() => {
        
      //   console.log("idusuario");
      //   console.log(idusuario);
      //   console.log("estatus");
      //   console.log(estatus_usuario);

      // }, 1500);

      // setTimeout(() => {
        
      //   if (estatus_usuario==0) {

      //     if (message.body === 'Menu' && message.isGroupMsg === false) {
      //         client
      //         .sendText(message.from, 'Hola!!! Gracias por comunicarte a *Uniformes De Luna*. Te recordamos que nuestro horario de atención es de lunes a viernes de 9:00am a 5:00pm.\n\nPor favor escribe el numero de la opción deseada:\n\n*1.* - Kinder\n*2.* - Primaria\n*3.* - Secundaria')
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //                 if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=1 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         });
      //     }
          
      //   }

      //   if (estatus_usuario==1) {
      //     if (message.body === '1' && message.isGroupMsg === false){
      //         client
      //         .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         });
      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //         .sendText(message.from, 'Has seleccionado *Primaria*, por favor ingresa el nombre de la escuela')
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=3 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         });
      //     }
      //     if (message.body === '3' && message.isGroupMsg === false){
      //       client
      //         .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         });
      //     }
      //     if (message.body != '1' && message.body != '2' && message.body != '3') {
      //         client
      //         .sendText(message.from, 'Por favor escribe el numero de la opción deseada:\n\n*1.* - Kinder\n*2.* - Primaria\n*3.* - Secundaria')
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //                 if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=1 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         });
      //     }

      //   }








      //   Opciones para kinder Citlaltzintli

      //   if (estatus_usuario==2) {

      //     if ((message.body === 'Citla' && message.isGroupMsg === false) || 
      //         (message.body === 'Kinder Citlaltzintli' && message.isGroupMsg === false) ||
      //         (message.body === 'Citlaltzintli' && message.isGroupMsg === false) ||
      //         (message.body === 'Preescolar Citlaltzintli' && message.isGroupMsg === false) ||
      //         (message.body === 'Escuela Citlaltzintli' && message.isGroupMsg === false) ||
      //         (message.body === 'Kinder citlaltzintli' && message.isGroupMsg === false) ||
      //         (message.body === 'Preescolar citlaltzintli' && message.isGroupMsg === false) ||
      //         (message.body === 'Escuela citlaltzintli' && message.isGroupMsg === false)
      //     ) {
      //       client
      //       .sendText(message.from, '¿Usted quiso decir *Kinder Citlaltzintli*?\n\n*1.* - Si\n*2.* - No')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //               if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=5 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }else{

      //       if ((message.body === 'Adolfo Christlieb Ibarola' && message.isGroupMsg === false) || 
      //           (message.body === 'Adolfo Christlieb' && message.isGroupMsg === false) ||
      //           (message.body === 'Christlieb Ibarola' && message.isGroupMsg === false) ||
      //           (message.body === 'Christlieb' && message.isGroupMsg === false) ||
      //           (message.body === 'Ibarola' && message.isGroupMsg === false) ||
      //           (message.body === 'Adolfo christlieb ibarola' && message.isGroupMsg === false) ||
      //           (message.body === 'Adolfo christlieb' && message.isGroupMsg === false) ||
      //           (message.body === 'Kinder Adolfo Christlieb Ibarola' && message.isGroupMsg === false) ||
      //           (message.body === 'Kinder adolfo christlieb ibarola' && message.isGroupMsg === false)
      //       ) {
      //         client
      //         .sendText(message.from, '¿Usted quiso decir *Kínder “Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*?\n\n*1.* - Si\n*2.* - No')
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //                 if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=10 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         });

      //       }else{
                
      //         if ((message.body === 'Kinder Gorgonio Cortes Carrasco' && message.isGroupMsg === false) || 
      //             (message.body === 'Kinder gorgonio cortes carrasco' && message.isGroupMsg === false) ||
      //             (message.body === 'Kinder gorgonio cortes' && message.isGroupMsg === false) ||
      //             (message.body === 'Kinder gorgonio' && message.isGroupMsg === false) ||
      //             (message.body === 'Gorgonio Cortes Carrasco' && message.isGroupMsg === false) ||
      //             (message.body === 'Gorgonio cortes carrasco' && message.isGroupMsg === false)
      //         ) {
      //           client
      //           .sendText(message.from, '¿Usted quiso decir *Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*?\n\n*1.* - Si\n*2.* - No')
      //           .then((result) => {

      //               const conection = mysql.createConnection({
      //                 host: 'srv366.hstgr.io',
      //                 user: 'u690371019_deluna',
      //                 password: '4ZaZ>]qkFOn#',
      //                 database: 'u690371019_deluna'
      //               })
      //               conection.connect( (err) =>{
      //                   if(err) throw err
      //               })
      //               const consulta1 = "UPDATE usuarios_remotos SET estatus=15 WHERE idusuario='"+idusuario+"'"
      //               conection.query(consulta1, (err, rows) =>{
      //                 if(err) throw err 
      //               })
      //               conection.end()

      //           })
      //           .catch((erro) => {
      //             console.error('Error when sending: ', erro); //return object error
      //           });

      //         }else{
                  

      //           if ((message.body === 'Kinder Jose Luis Figueroa' && message.isGroupMsg === false) || 
      //               (message.body === 'Kinder jose luis figueroa' && message.isGroupMsg === false) ||
      //               (message.body === 'Kinder Jose Luis' && message.isGroupMsg === false) ||
      //               (message.body === 'Jose Luis Figueroa' && message.isGroupMsg === false) ||
      //               (message.body === 'Jose luis figueroa' && message.isGroupMsg === false) ||
      //               (message.body === 'Luis figueroa' && message.isGroupMsg === false) ||
      //               (message.body === 'Luis Figueroa' && message.isGroupMsg === false)
      //           ) {
      //             client
      //             .sendText(message.from, '¿Usted quiso decir *Kínder “José Luis Figueroa” (Kínder Chulavista T/M)*?\n\n*1.* - Si\n*2.* - No')
      //             .then((result) => {

      //                 const conection = mysql.createConnection({
      //                   host: 'srv366.hstgr.io',
      //                   user: 'u690371019_deluna',
      //                   password: '4ZaZ>]qkFOn#',
      //                   database: 'u690371019_deluna'
      //                 })
      //                 conection.connect( (err) =>{
      //                     if(err) throw err
      //                 })
      //                 const consulta1 = "UPDATE usuarios_remotos SET estatus=20 WHERE idusuario='"+idusuario+"'"
      //                 conection.query(consulta1, (err, rows) =>{
      //                   if(err) throw err 
      //                 })
      //                 conection.end()

      //             })
      //             .catch((erro) => {
      //               console.error('Error when sending: ', erro); //return object error
      //             });

      //           }else{
                    

      //             if ((message.body === 'Kinder Francisco Ruiz Sanchez' && message.isGroupMsg === false) || 
      //                 (message.body === 'Kinder Francisco Ruiz' && message.isGroupMsg === false) ||
      //                 (message.body === 'Kinder Francisco Ruiz' && message.isGroupMsg === false) ||
      //                 (message.body === 'Francisco Ruiz' && message.isGroupMsg === false) ||
      //                 (message.body === 'Kinder francisco ruiz sanchez' && message.isGroupMsg === false) ||
      //                 (message.body === 'Kinder francisco ruiz' && message.isGroupMsg === false) ||
      //                 (message.body === 'Francisco ruiz' && message.isGroupMsg === false)
      //             ) {
      //               client
      //               .sendText(message.from, '¿Usted quiso decir *Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*?\n\n*1.* - Si\n*2.* - No')
      //               .then((result) => {

      //                   const conection = mysql.createConnection({
      //                     host: 'srv366.hstgr.io',
      //                     user: 'u690371019_deluna',
      //                     password: '4ZaZ>]qkFOn#',
      //                     database: 'u690371019_deluna'
      //                   })
      //                   conection.connect( (err) =>{
      //                       if(err) throw err
      //                   })
      //                   const consulta1 = "UPDATE usuarios_remotos SET estatus=25 WHERE idusuario='"+idusuario+"'"
      //                   conection.query(consulta1, (err, rows) =>{
      //                     if(err) throw err 
      //                   })
      //                   conection.end()

      //               })
      //               .catch((erro) => {
      //                 console.error('Error when sending: ', erro); //return object error
      //               });

      //             }else{
      //                 client
      //                 .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
      //                 .then((result) => {

      //                     const conection = mysql.createConnection({
      //                       host: 'srv366.hstgr.io',
      //                       user: 'u690371019_deluna',
      //                       password: '4ZaZ>]qkFOn#',
      //                       database: 'u690371019_deluna'
      //                     })
      //                     conection.connect( (err) =>{
      //                       if(err) throw err
      //                     })
      //                     const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
      //                     conection.query(consulta1, (err, rows) =>{
      //                       if(err) throw err 
      //                     })
      //                     conection.end()

      //                 })
      //                 .catch((erro) => {
      //                   console.error('Error when sending: ', erro); //return object error
      //                 });
      //             }
      //           }

      //         }




      //       }

      //     }

      //   }

      //   if (estatus_usuario==3) {

      //             if ((message.body === 'Primaria 24 de octubre' && message.isGroupMsg === false) || 
      //                 (message.body === 'Primaria 24 de Octubre' && message.isGroupMsg === false) ||
      //                 (message.body === 'primaria 24 de octubre' && message.isGroupMsg === false) ||
      //                 (message.body === '24 de octubre' && message.isGroupMsg === false) 
      //             ) {
      //               client
      //               .sendText(message.from, '¿Usted quiso decir *Primaria 24 de octubre*?\n\n*1.* - Si\n*2.* - No')
      //               .then((result) => {

      //                   const conection = mysql.createConnection({
      //                     host: 'srv366.hstgr.io',
      //                     user: 'u690371019_deluna',
      //                     password: '4ZaZ>]qkFOn#',
      //                     database: 'u690371019_deluna'
      //                   })
      //                   conection.connect( (err) =>{
      //                       if(err) throw err
      //                   })
      //                   const consulta1 = "UPDATE usuarios_remotos SET estatus=30 WHERE idusuario='"+idusuario+"'"
      //                   conection.query(consulta1, (err, rows) =>{
      //                     if(err) throw err 
      //                   })
      //                   conection.end()

      //               })
      //               .catch((erro) => {
      //                 console.error('Error when sending: ', erro); //return object error
      //               });

      //             }else{
      //                 client
      //                 .sendText(message.from, 'Has seleccionado *Primaria*, por favor ingresa el nombre de la escuela')
      //                 .then((result) => {

      //                     const conection = mysql.createConnection({
      //                       host: 'srv366.hstgr.io',
      //                       user: 'u690371019_deluna',
      //                       password: '4ZaZ>]qkFOn#',
      //                       database: 'u690371019_deluna'
      //                     })
      //                     conection.connect( (err) =>{
      //                       if(err) throw err
      //                     })
      //                     const consulta1 = "UPDATE usuarios_remotos SET estatus=3 WHERE idusuario='"+idusuario+"'"
      //                     conection.query(consulta1, (err, rows) =>{
      //                       if(err) throw err 
      //                     })
      //                     conection.end()

      //                 })
      //                 .catch((erro) => {
      //                   console.error('Error when sending: ', erro); //return object error
      //                 });
      //             }
          
      //   }

      //   if (estatus_usuario==4) {

      //             if ((message.body === 'Escuela Secundaria General #17 Jose Antonio Torres' && message.isGroupMsg === false) || 
      //                 (message.body === 'Escuela Secundaria General 17 Jose Antonio Torres' && message.isGroupMsg === false) ||
      //                 (message.body === 'Secundaria General 17 Jose Antonio Torres' && message.isGroupMsg === false) ||
      //                 (message.body === 'General 17 Jose Antonio Torres' && message.isGroupMsg === false) ||
      //                 (message.body === 'General 17' && message.isGroupMsg === false) ||
      //                 (message.body === 'Jose Antonio Torres' && message.isGroupMsg === false) ||
      //                 (message.body === 'Jose Antonio' && message.isGroupMsg === false)
      //             ) {
      //               client
      //               .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria General #17 "Jose Antonio Torres"*?\n\n*1.* - Si\n*2.* - No')
      //               .then((result) => {

      //                   const conection = mysql.createConnection({
      //                     host: 'srv366.hstgr.io',
      //                     user: 'u690371019_deluna',
      //                     password: '4ZaZ>]qkFOn#',
      //                     database: 'u690371019_deluna'
      //                   })
      //                   conection.connect( (err) =>{
      //                       if(err) throw err
      //                   })
      //                   const consulta1 = "UPDATE usuarios_remotos SET estatus=40 WHERE idusuario='"+idusuario+"'"
      //                   conection.query(consulta1, (err, rows) =>{
      //                     if(err) throw err 
      //                   })
      //                   conection.end()

      //               })
      //               .catch((erro) => {
      //                 console.error('Error when sending: ', erro); //return object error
      //               });

      //             }else{
                      

      //               if ((message.body === 'Escuela Secundaria General #132 Carlos Gonzalez Peña' && message.isGroupMsg === false) || 
      //                   (message.body === 'Escuela Secundaria General 132 Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
      //                   (message.body === 'Secundaria General 132 Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
      //                   (message.body === 'General 132 Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
      //                   (message.body === 'General 132' && message.isGroupMsg === false) ||
      //                   (message.body === 'Carlos Gonzalez Peña' && message.isGroupMsg === false) ||
      //                   (message.body === 'Carlos Gonzalez' && message.isGroupMsg === false)
      //               ) {
      //                 client
      //                 .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria General #132 “Carlos González Peña"*?\n\n*1.* - Si\n*2.* - No')
      //                 .then((result) => {

      //                     const conection = mysql.createConnection({
      //                       host: 'srv366.hstgr.io',
      //                       user: 'u690371019_deluna',
      //                       password: '4ZaZ>]qkFOn#',
      //                       database: 'u690371019_deluna'
      //                     })
      //                     conection.connect( (err) =>{
      //                         if(err) throw err
      //                     })
      //                     const consulta1 = "UPDATE usuarios_remotos SET estatus=45 WHERE idusuario='"+idusuario+"'"
      //                     conection.query(consulta1, (err, rows) =>{
      //                       if(err) throw err 
      //                     })
      //                     conection.end()

      //                 })
      //                 .catch((erro) => {
      //                   console.error('Error when sending: ', erro); //return object error
      //                 });

      //               }else{
                        
      //                 if ((message.body === 'Escuela Secundaria General #64 Jesus Reyes Heroles' && message.isGroupMsg === false) || 
      //                     (message.body === 'Escuela Secundaria General 64 Jesus Reyes Heroles' && message.isGroupMsg === false) ||
      //                     (message.body === 'Secundaria General 64 Jesus Reyes Heroles' && message.isGroupMsg === false) ||
      //                     (message.body === 'General 64 Jesus Reyes Heroles' && message.isGroupMsg === false) ||
      //                     (message.body === 'General 64' && message.isGroupMsg === false) ||
      //                     (message.body === 'Escuela Secundaria Jesus Reyes Heroles' && message.isGroupMsg === false) ||
      //                     (message.body === 'Jesus Reyes Heroles' && message.isGroupMsg === false)
      //                 ) {
      //                   client
      //                   .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria General #64 “Jesús Reyes Heroles”*?\n\n*1.* - Si\n*2.* - No')
      //                   .then((result) => {

      //                       const conection = mysql.createConnection({
      //                         host: 'srv366.hstgr.io',
      //                         user: 'u690371019_deluna',
      //                         password: '4ZaZ>]qkFOn#',
      //                         database: 'u690371019_deluna'
      //                       })
      //                       conection.connect( (err) =>{
      //                           if(err) throw err
      //                       })
      //                       const consulta1 = "UPDATE usuarios_remotos SET estatus=50 WHERE idusuario='"+idusuario+"'"
      //                       conection.query(consulta1, (err, rows) =>{
      //                         if(err) throw err 
      //                       })
      //                       conection.end()

      //                   })
      //                   .catch((erro) => {
      //                     console.error('Error when sending: ', erro); //return object error
      //                   });

      //                 }else{
                          
      //                   if ((message.body === 'Escuela Secundaria Mixta Foranea #10' && message.isGroupMsg === false) || 
      //                       (message.body === 'Escuela Secundaria Mixta Foranea 10' && message.isGroupMsg === false) ||
      //                       (message.body === 'Secundaria Mixta Foranea 10' && message.isGroupMsg === false) ||
      //                       (message.body === 'Mixta Foranea 10' && message.isGroupMsg === false) ||
      //                       (message.body === 'Secundaria Foranea 10' && message.isGroupMsg === false) ||
      //                       (message.body === 'Foranea 10' && message.isGroupMsg === false)
      //                   ) {
      //                     client
      //                     .sendText(message.from, '¿Usted quiso decir *Escuela Secundaria Mixta “Foránea #10”*?\n\n*1.* - Si\n*2.* - No')
      //                     .then((result) => {

      //                         const conection = mysql.createConnection({
      //                           host: 'srv366.hstgr.io',
      //                           user: 'u690371019_deluna',
      //                           password: '4ZaZ>]qkFOn#',
      //                           database: 'u690371019_deluna'
      //                         })
      //                         conection.connect( (err) =>{
      //                             if(err) throw err
      //                         })
      //                         const consulta1 = "UPDATE usuarios_remotos SET estatus=55 WHERE idusuario='"+idusuario+"'"
      //                         conection.query(consulta1, (err, rows) =>{
      //                           if(err) throw err 
      //                         })
      //                         conection.end()

      //                     })
      //                     .catch((erro) => {
      //                       console.error('Error when sending: ', erro); //return object error
      //                     });

      //                   }else{
      //                       client
      //                       .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
      //                       .then((result) => {

      //                           const conection = mysql.createConnection({
      //                             host: 'srv366.hstgr.io',
      //                             user: 'u690371019_deluna',
      //                             password: '4ZaZ>]qkFOn#',
      //                             database: 'u690371019_deluna'
      //                           })
      //                           conection.connect( (err) =>{
      //                             if(err) throw err
      //                           })
      //                           const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
      //                           conection.query(consulta1, (err, rows) =>{
      //                             if(err) throw err 
      //                           })
      //                           conection.end()

      //                       })
      //                       .catch((erro) => {
      //                         console.error('Error when sending: ', erro); //return object error
      //                       });
      //                   }


      //                 }

      //               }

      //             }
          
      //   }




      //   if (estatus_usuario==5) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=6 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==6){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693206833/De%20Luna/Citlaltzintli/Precios_sk2lia.png',
      //         'image-name',
      //         'Lista de precios de *Kinder Citlaltzintli*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=1 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=7 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=8 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=6 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==7) {

      //       if (message.body === '3' && message.isGroupMsg === false){

      //           client
      //           .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //           .then((result) => {

      //               const conection = mysql.createConnection({
      //                 host: 'srv366.hstgr.io',
      //                 user: 'u690371019_deluna',
      //                 password: '4ZaZ>]qkFOn#',
      //                 database: 'u690371019_deluna'
      //               })
      //               conection.connect( (err) =>{
      //                 if(err) throw err
      //               })
      //               const consulta1 = "UPDATE usuarios_remotos SET estatus=9 WHERE idusuario='"+idusuario+"'"
      //               conection.query(consulta1, (err, rows) =>{
      //                 if(err) throw err 
      //               })
      //               conection.end()

      //           })
      //           .catch((erro) => {
      //             console.error('Error when sending: ', erro); //return object error
      //           })
              
      //      }
          
      //   }










      //   if (estatus_usuario==10) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Kinder Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=11 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==11){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693421399/De%20Luna/Kinder%20Adolfo%20Christlieb%20Ibarola/Dise%C3%B1o_sin_t%C3%ADtulo_38_rvnuob.png',
      //         'image-name',
      //         'Lista de precios de *Kinder Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=2 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=12 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=13 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Kinder Adolfo Christlieb Ibarola” (Kínder Urbi T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=11 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==12) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=14 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //    }
        
      //   }


        








      //   if (estatus_usuario==15) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=16 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==16){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693428994/De%20Luna/Kinder%20Gorgonio%20Cortes%20Carrasco/Dise%C3%B1o_sin_t%C3%ADtulo_39_mwbcfq.png',
      //         'image-name',
      //         'Lista de precios de *Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=3 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=17 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=18 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Kínder “Gorgonio Cortes Carrasco” (Kínder Urbi T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=16 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==17) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=19 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //    }
        
      //   }









        

      //   if (estatus_usuario==20) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Kínder “José Luis Figueroa” (Kínder Chulavista T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=21 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==21){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693429647/De%20Luna/K%C3%ADnder%20Jos%C3%A9%20Luis%20Figueroa/Dise%C3%B1o_sin_t%C3%ADtulo_40_zybgyv.png',
      //         'image-name',
      //         'Lista de precios de *Kínder “José Luis Figueroa” (Kínder Chulavista T/M)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=4 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=22 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=23 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*José Luis Figueroa (Kínder Chulavista T/M)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=21 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==22) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=24 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //    }
        
      //   }











      //   if (estatus_usuario==25) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=26 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Kinder*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=2 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==26){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693430633/De%20Luna/Kinder%20Francisco%20Ruiz%20S%C3%A1nchez/Dise%C3%B1o_sin_t%C3%ADtulo_41_b2pu7l.png',
      //         'image-name',
      //         'Lista de precios de *Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=5 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=27 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=28 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Kínder “Francisco Ruiz Sánchez” (Kínder Chulavista T/V)*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=26 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==27) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=29 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //    }
        
      //   }













      //   if (estatus_usuario==30) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Primaria 24 de octubre*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=31 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Primaria*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=3 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==31){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1690962050/De%20Luna/Prim%2024%20de%20octubre/Primaria_Onu_onoem2.jpg',
      //         'image-name',
      //         'Lista de precios de *Primaria 24 de octubre*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=6 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=32 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=33 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Primaria 24 de octubre*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=31 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==32) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=34 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //    }
        
      //   }













      //   if (estatus_usuario==40) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Escuela Secundaria General #17 "Jose Antonio Torres"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=41 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==41){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693436407/De%20Luna/Sec%20General%2017/general_17_w7avqt.jpg',
      //         'image-name',
      //         'Lista de precios de *Escuela Secundaria General #17 "Jose Antonio Torres"*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=8 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=42 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=43 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Escuela Secundaria General #17 "Jose Antonio Torres"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=41 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==42) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=44 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //    }
        
      //   }












      //   if (estatus_usuario==45) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Escuela Secundaria General #132 “Carlos González Peña"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=46 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==46){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693437169/De%20Luna/Sec%20Gen%20132/Dise%C3%B1o_sin_t%C3%ADtulo_42_xli0ch.png',
      //         'image-name',
      //         'Lista de precios de *Escuela Secundaria General #132 “Carlos González Peña"*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=9 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=47 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=48 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Escuela Secundaria General #132 “Carlos González Peña"*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=46 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==47) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=49 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
        
      //   }













      //   if (estatus_usuario==50) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Escuela Secundaria General #64 “Jesús Reyes Heroles”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=51 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==51){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1690962461/De%20Luna/Sec%20Gen%2064/Sec._Gral._64_y6iglv.jpg',
      //         'image-name',
      //         'Lista de precios de *Escuela Secundaria General #64 “Jesús Reyes Heroles”*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=10 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=52 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=53 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Escuela Secundaria General #64 “Jesús Reyes Heroles”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=51 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==52) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=54 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
        
      //   }












      //   if (estatus_usuario==55) {
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, '*Escuela Secundaria Mixta “Foránea #10”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=56 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }
      //     if (message.body === '2' && message.isGroupMsg === false){
      //       client
      //       .sendText(message.from, 'Has seleccionado *Secundaria*, por favor ingresa el nombre de la escuela')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=4 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });
      //     }
      //   }

      //   if (estatus_usuario==56){
      //     if (message.body === '1' && message.isGroupMsg === false){

      //       client
      //       .sendImage(
      //         message.from,
      //         'https://res.cloudinary.com/ddcszcshl/image/upload/v1693438858/De%20Luna/Sec%20Foranea%2010/Dise%C3%B1o_sin_t%C3%ADtulo_43_bcgoce.png',
      //         'image-name',
      //         'Lista de precios de *Escuela Secundaria Mixta “Foránea #10”*\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación'
      //       )
      //       .sendText(message.from, '*Kinder Citlaltzintli*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

      //     }

      //     if (message.body === '2' && message.isGroupMsg === false){

      //       const conection = mysql.createConnection({
      //         host: 'srv366.hstgr.io',
      //         user: 'u690371019_deluna',
      //         password: '4ZaZ>]qkFOn#',
      //         database: 'u690371019_deluna'
      //       })
      //       conection.connect( (err) =>{
      //           if(err) throw err
      //       })
      //       const consulta1 = "SELECT * FROM detalle_escuelas WHERE idescuela=11 ORDER BY iddetalle DESC LIMIT 1"
      //       conection.query(consulta1, (err, rows) =>{
      //         if(err) throw err 
      //         fecha = rows[0].fecha;
      //         hora1 = rows[0].hora1;
      //         hora2 = rows[0].hora2;
      //         detalle = rows[0].detalle;
      //       })
      //       conection.end()

      //       setTimeout(() => {

      //         var fecha_hora = "Fecha: "+fecha+"\n"+"Horario: "+hora1+" - "+hora2+"\n"+"Detalle: "+detalle+"\n\n¿Desea realizar otra consulta?\n\n1. Precios\n2. Fechas y horarios de venta\n3. Seguimiento de un pedido\n4. Necesito hacer otra consulta no disponible en el menú\n5. Terminar conversación";
              
      //         client
      //         .sendText(message.from, fecha_hora)
      //         .then((result) => {

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
      //       }, 1000);
      //     }

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "Por favor ingrese el *folio* que se encuentra en su ticket.")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=57 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '4' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ A la brevedad un asesor se comunicará con usted.")
      //         .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=58 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
            
      //     }

      //     if (message.body === '5' && message.isGroupMsg === false){

      //       client
      //       .sendText(message.from, "Gracias por comunicarte a *Uniformes De Luna*")
      //       .then((result) => {

      //         const conection = mysql.createConnection({
      //           host: 'srv366.hstgr.io',
      //           user: 'u690371019_deluna',
      //           password: '4ZaZ>]qkFOn#',
      //           database: 'u690371019_deluna'
      //         })
      //         conection.connect( (err) =>{
      //           if(err) throw err
      //         })
      //         const consulta1 = "UPDATE usuarios_remotos SET estatus=0 WHERE idusuario='"+idusuario+"'"
      //         conection.query(consulta1, (err, rows) =>{
      //           if(err) throw err 
      //         })
      //         conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       })
          
      //     }

      //     if (message.body != '1' && message.body != '2' && message.body != '3' && message.body != '4' && message.body != '5') {

      //       client
      //       .sendText(message.from, '*Escuela Secundaria Mixta “Foránea #10”*\n\n¿Que información desea consultar? escriba el numero de la opcion deseada\n\n*1.* - Precios\n*2.* - Fechas y horarios de venta\n*3.* - Seguimiento de un pedido\n*4.* - Necesito hacer otra consulta no disponible en el menú\n*5.* - Terminar conversación')
      //       .then((result) => {

      //           const conection = mysql.createConnection({
      //             host: 'srv366.hstgr.io',
      //             user: 'u690371019_deluna',
      //             password: '4ZaZ>]qkFOn#',
      //             database: 'u690371019_deluna'
      //           })
      //           conection.connect( (err) =>{
      //             if(err) throw err
      //           })
      //           const consulta1 = "UPDATE usuarios_remotos SET estatus=56 WHERE idusuario='"+idusuario+"'"
      //           conection.query(consulta1, (err, rows) =>{
      //             if(err) throw err 
      //           })
      //           conection.end()

      //       })
      //       .catch((erro) => {
      //         console.error('Error when sending: ', erro); //return object error
      //       });

            
      //     }

      //   }

      //   if (estatus_usuario==57) {

      //     if (message.body === '3' && message.isGroupMsg === false){

      //         client
      //         .sendText(message.from, "⌛⌛⌛ Consultando folio, un momento por favor...")
      //         .then((result) => {

      //             const conection = mysql.createConnection({
      //               host: 'srv366.hstgr.io',
      //               user: 'u690371019_deluna',
      //               password: '4ZaZ>]qkFOn#',
      //               database: 'u690371019_deluna'
      //             })
      //             conection.connect( (err) =>{
      //               if(err) throw err
      //             })
      //             const consulta1 = "UPDATE usuarios_remotos SET estatus=59 WHERE idusuario='"+idusuario+"'"
      //             conection.query(consulta1, (err, rows) =>{
      //               if(err) throw err 
      //             })
      //             conection.end()

      //         })
      //         .catch((erro) => {
      //           console.error('Error when sending: ', erro); //return object error
      //         })
        
      //   }








//       }, 2000);
   });
}


