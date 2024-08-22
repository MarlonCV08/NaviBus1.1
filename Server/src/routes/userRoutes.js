const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = 'Steven';
 
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
        return res.status(500).send('Error al ejecutar la consulta');
      }

      if(results.length > 0) {
        const user = results[0];
        const roleMap = { 1:'administrador', 2:'conductor', 3:'despachador' };
        const userRole = roleMap[user.rol];

        if (!userRole) {
          return res.status(403).json({ message: `Rol '${user.rol}' no valido.` });
        }

        const token = jwt.sign(
          { usuario: user.usuario, rol: userRole }, 
          SECRET_KEY
        );

        res.json({ token, message: 'Inicio de sesión exitoso', user: { ...user, rol: userRole } });
      } else {
        res.status(401).json({ message: 'Usuario o clave incorrectos' });
      }
    });
  });

  return router;
};

module.exports = userRoutes;