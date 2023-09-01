const mysql = require('mysql')
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

conection.end()