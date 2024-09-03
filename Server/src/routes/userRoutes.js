const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = 'Steven';
 
const userRoutes = (db) => {
  router.post('/', (req, res) => {
    const { cedula, clave } = req.body;

    if(!cedula || !clave) {
      return res.status(400).json({ message: 'Usuario y clave son requeridos' });
    }

    const sql = 'SELECT cedula, clave, rol_id FROM usuarios WHERE cedula = ? AND clave = ?';
    db.query(sql, [cedula, clave], (err, results) => {
      if(err) {
        console.error('Error al ejecutar la consulta: ', err);
        return res.status(500).send('Error al ejecutar la consulta');
      }

      if(results.length > 0) {
        const user = results[0];
        const roleMap = { 1:'administrador', 2:'conductor', 3:'despachador' };
        const userRole = roleMap[user.rol_id];

        if (!userRole) {
          return res.status(403).json({ message: `Rol '${user.rol_id}' no valido.` });
        }

        const token = jwt.sign(
          { cedula: user.cedula, rol: userRole }, 
          SECRET_KEY
        );

        res.json({ token, message: 'Inicio de sesión exitoso', user: { cedula:user.cedula, rol: userRole } });
      } else {
        res.status(401).json({ message: 'Usuario o clave incorrectos' });
      }
    });
  });

  return router;
};

module.exports = userRoutes;