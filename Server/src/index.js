const express = require('express');
const mysql = require('mysql2');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

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

app.get('/', (req, res)=> {
  res.send('Hola soy la raiz');
});

//Consulta a la base de datos
app.get('/usuarios', (req, res)=> {
  const sql = 'SELECT * FROM login';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

app.use('/', userRoutes(db));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

