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
              INNER JOIN ruta_usuarios ru ON ru.cedula = u.cedula
              WHERE ru.ruta_codigo = ${rutaCodigo}`;

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
  const { rol} = req.body;
  console.log('Rol ID recibido:', rol);
  res.json({ message: 'Rol ID recibido correctamente' });
});

//Traer e insertar datos del formulario de administrador
app.post('/api/administradores', (req, res) => {
  const { cedula, nombres, apellidos, tipodocumento, correo, rol } = req.body;
  console.log('Datos recibidos:', { cedula, nombres, apellidos, tipodocumento, correo, rol });

  const sql = `INSERT INTO usuarios (cedula, nombres, apellidos, tipodocumento, correo, rol)
  VALUES (?, ?, ?, ?, ?, ?)`

  db.query(sql, [cedula, nombres, apellidos, tipodocumento, correo, rol], (err, results) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      return res.status(500).json({ error: 'Error al insertar los datos en la base de datos' })
    }
    res.status(201).json({ message: 'Administrador creado con extito' });
  });

});

//Traer datos del formulario del conductor
app.post('/api/conductores', (req, res) => {
  const { cedula, nombres, apellidos, tipodocumento, correo, rol, categoria } = req.body;
  console.log('Datos recibidos:', { cedula, nombres, apellidos, tipodocumento, correo, rol, categoria });

  res.status(201).json({ message: 'Conductor creado con extito' });
});

//Traer datos del formulario del despachador
app.post('/api/despachadores', (req, res) => {
  const { cedula, nombres, apellidos, tipodocumento, correo, rol } = req.body;
  console.log('Datos recibidos:', { cedula, nombres, apellidos, tipodocumento, correo, rol });

  const sql = `INSERT INTO usuarios (cedula, nombres, apellidos, tipodocumento, correo, rol)
  VALUES (?, ?, ?, ?, ?, ?)`
  db.query(sql, [cedula, nombres, apellidos, tipodocumento, correo, rol], (err, results) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      return res.status(500).json({ error: 'Error al insertar los datos en la base de datos' });
    }
    res.status(201).json({ message: 'Despachador creado con extito' });
  })
});

//Traer datos del formulario del vehiculo
app.post('/api/vehiculos', (req, res) => {
  const { cedula, nombres, apellidos, tipodocumento, correo, rol } = req.body;
  console.log('Datos recibidos:', { cedula, nombres, apellidos, tipodocumento, correo, rol });

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


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

