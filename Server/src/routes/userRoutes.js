const express = require('express');

const router = express.Router();
 
const userRoutes = (db) => {
  router.post('/', (req, res) => {
    const { usuario, clave } = req.body;

    if(!usuario || !clave) {
      return res.status(400).json({ message: 'Usuario y clave son requeridos' });
    }

    const sql = 'SELECT * FROM login WHERE usuario = ? AND clave = ?';
    db.query(sql, [usuario, clave], (err, results) => {
      if(err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al ejecutar la consulta');
        return;
      }

      if(results.length > 0) {
        res.json({ message: 'Inicio de sesión exitoso', user: results[0] });
      } else {
        res.status(401).json({ message: 'Usuario o clave incorrectos' });
      }
    });
  });

  return router;
};

module.exports = userRoutes;