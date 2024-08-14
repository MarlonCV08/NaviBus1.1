const mysql = require('mysql2');

//Configurar la conexion a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'navibus'
});

//Conectar la base de datos
db.connect((err)=> {
  if (err) {
    console.error('Error de conexion a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MYSQL');
});

module.exports = db;