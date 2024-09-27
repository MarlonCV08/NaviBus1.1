const express = require('express');
const app = express();
const http = require('http');  // Asegúrate de importar http
const PORT = 3000;

const db = require('./db');
const cors = require('./cors');
const server = http.createServer(app);  // Crear servidor HTTP

const userRoutes = require('./routes/userRoutes');
const vehicleForm = require('./routes/vehicleForm');
const adminForm = require('./routes/adminForm');
const conduForm = require('./routes/conduForm');
const despaForm = require('./routes/despaForm');
const initializeSocket = require('./io');
const asignarCondu = require('./routes/asignarCondu');


//Configurar Express para manejar JSON
app.use(express.json());

//configurar CORS
app.use(cors);

// Inicializar Socket.IO
initializeSocket(server);  // Pasamos el servidor HTTP a la función de Socket.IO

//Traer datos del formulario del usuario
app.use('/', userRoutes(db));

//Traer e insertar datos del formulario de administrador
app.use('/api/administradores', adminForm(db));

//Traer datos del formulario del conductor
app.use('/api/conductores', conduForm(db));

//Traer datos del formulario del despachador
app.use('/api/despachadores', despaForm(db));

//Traer datos del formulario del vehiculo
app.use('/api/vehiculos', vehicleForm(db));

//Traer y asignar conductor a una ruta
app.use('/api/asignar-rutas', asignarCondu(db));

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
app.get('/api/usuarios/:rutaNombre', (req, res) => {

  const { rutaNombre } = req.params;
  console.log('Ruta solicitada:', rutaNombre); 

  const sql = `SELECT u.cedula ,u.nombres, u.apellidos FROM usuarios u
              INNER JOIN ruta_usuarios ru ON ru.cedula = u.cedula
              INNER JOIN ruta r ON r.codigo = ru.ruta_codigo
              WHERE r.nombre = ?`;

  db.query(sql, [rutaNombre], (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Error al obtener los datos', err });
            }
            res.json(results);
            console.log(results);
          }
          )

});

//Consulta de usuarios a la base de datos
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
  const { rol } = req.body;
  console.log('Rol ID recibido:', rol);
  res.json({ message: 'Rol ID recibido correctamente' });
});

//Consulta de despachadores por ID a la base de datos
app.get('/api/id-despachadores', (req, res) => {
  const sql = 'SELECT cedula, nombres, apellidos FROM usuarios WHERE rol = 3';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//Consulta de conductores por ID a la base de datos
app.get('/api/id-conductores', (req, res) => {
  const sql = 'SELECT cedula, nombres, apellidos FROM usuarios WHERE rol = 2';
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

//consulta para obtener opciones de tipo de documento
app.get('/api/tipodocumento', (req, res) => {
  const sql = 'SELECT * FROM tipodocumento';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//Consulta para obtener opciones de marca
app.get('/api/marca', (req, res) => {
  const sql = 'SELECT * FROM marca';

  db.query(sql, (err, results) => {
    if(err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//Consulta para obtener opciones de linea dependiendo la marca
app.get('/api/linea/:marcaCod', (req, res) => {
  const marcaCod = req.params.marcaCod;
  const sql = 'SELECT * FROM linea WHERE marca = ?';

  db.query(sql, [marcaCod], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//Consulta para obtener opciones de clasevehiculo
app.get('/api/clasevehiculo', (req, res) => {
  const sql = 'SELECT * FROM clasevehiculo';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});

//consulta para obtener opciones de categoria
app.get('/api/categoria', (req, res) => {
  const sql = 'SELECT * FROM categoria';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    res.json(results);
  });
});


server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

