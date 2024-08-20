const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = 'Steven';
 
const userRoutes = (db) => {
  router.post('/', (req, res) => {
    const { usuario, clave, rol } = req.body;

    if(!usuario || !clave) {
      return res.status(400).json({ message: 'Usuario y clave son requeridos' });
    }

    const sql = 'SELECT * FROM login WHERE usuario = ? AND clave = ? AND rol = ?';
    db.query(sql, [usuario, clave, rol], (err, results) => {
      if(err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al ejecutar la consulta');
        return;
      }

      if(results.length > 0) {
        const token = jwt.sign(
          { usuario: results[0].usuario, rol: results[0].rol }, 
          SECRET_KEY
        );

        res.json({ token, message: 'Inicio de sesión exitoso', user: results[0] });
      } else {
        res.status(401).json({ message: 'Usuario o clave incorrectos' });
      }
    });
  });

  return router;
};

module.exports = userRoutes;