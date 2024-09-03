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
app.get('/api/usuarios/:rutaCodigo', (req, res) => {

  const { rutaCodigo } = req.params;

  const sql = `SELECT u.nombres, u.apellidos FROM usuarios u
              INNER JOIN ruta r ON r.usuarios = u.cedula
              WHERE r.codigo = ${rutaCodigo}`;

  db.query(sql, [rutaCodigo], (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Error al obtener los datos', err });
            }
            res.json(results);
            console.log(results);
          }
          )

});

//Consulta de conductores a la base de datos
app.get('/api/usuarios', (req, res) => {
  const sql = 'SELECT nombres, apellidos from usuarios';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//Traer el id del usuario
app.post('/api/usuarios', (req, res) => {
  const { rolId} = req.body;
  console.log('Rol ID recibido:', rolId);
  res.json({ message: 'Rol ID recibido correctamente' });
});

//Traer datos del formulario de administrador
app.post('/api/administradores', (req, res) => {
  const { nombres, apellidos, documento, correo, rolId, dropdown } = req.body;
  console.log('Datos recibidos:', { nombres, apellidos, documento, correo, rolId, dropdown });

  res.status(201).json({ message: 'Administrador creado con extito' });
});

//Traer datos del formulario del conductor
app.post('/api/conductores', (req, res) => {
  const { nombres, apellidos, documento, correo, rolId, dropdown } = req.body;
  console.log('Datos recibidos:', { nombres, apellidos, documento, correo, rolId, dropdown });

  res.status(201).json({ message: 'Administrador creado con extito' });
});

//Traer datos del formulario del despachador
app.post('/api/despachadores', (req, res) => {
  const { nombres, apellidos, documento, correo, rolId, dropdown } = req.body;
  console.log('Datos recibidos:', { nombres, apellidos, documento, correo, rolId, dropdown });

  res.status(201).json({ message: 'Administrador creado con extito' });
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

