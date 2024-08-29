const express = require('express');
const app = express();
const PORT = 3000;

const db = require('./db');
const cors = require('./cors');
const userRoutes = require('./routes/userRoutes');

//Configurar Express para manejar JSON
app.use(express.json());

//configurar CORS
app.use(cors);


app.use('/', userRoutes(db));

app.get('/', (req, res) => {
  res.send('Hola soy la raiz');
});

//Consulta de usuarios a la base de datos
app.get('/usuarios', (req, res) => {
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

//Consulta de rutas a la base de datos
app.get('/api/rutas', (req, res) => {
  const sql = 'SELECT * FROM ruta';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//Consulta para obtener los conductores de las rutas asignadas
app.get('/api/conductores/:rutaCodigo', (req, res) => {

  const { rutaCodigo } = req.params;

  const sql = `SELECT c.nombres, c.apellidos FROM conductor c
              INNER JOIN ruta r ON r.conductor = c.codigo
              WHERE r.codigo = ${rutaCodigo}`;

  db.query(sql, [rutaCodigo], (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Error al obtener los datos', err });
            }
            res.json(results);
          }
          )

});

//Consulta de conductores a la base de datos
app.get('/api/conductores', (req, res) => {
  const sql = 'SELECT * from conductor';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//Consulta de roles a la base de datos
app.get('/api/roles', (req, res) => {
  const sql = 'SELECT * FROM rol';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

