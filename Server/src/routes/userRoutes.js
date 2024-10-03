const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const SECRET_KEY = 'Steven';
 
const userRoutes = (db) => {
  router.post('/',

    //Validaciones con express-validator
    [
      body('cedula').notEmpty().withMessage('El usuario es obligatorio'),
      body('clave')
      .notEmpty().withMessage('La clave es obligatoria')
      .isLength({ min: 8 }).withMessage('La clave debe tener al menos 8 caracteres')
    ],

    (req, res) => {

      //Manejo de errores de validacion
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { cedula, clave } = req.body;

      const sql = 'SELECT cedula, nombres, clave, rol FROM usuarios WHERE cedula = ? AND clave = ?';
      db.query(sql, [cedula, clave], (err, results) => {
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
            { cedula: user.cedula, rol: userRole }, 
            SECRET_KEY,
            { expiresIn: '1h' }
          );

          res.json({ 
            token, 
            message: 'Inicio de sesión exitoso', 
            user: { 
              cedula: user.cedula, 
              rol: userRole, 
              nombre: user.nombres 
            } 
          });
        } else {
          res.status(401).json({ message: 'Usuario o clave incorrectos' });
        }
      });
    });

    //Ruta para obtener los datos del usuario logueado
    router.get('/usuario-logueado', (req, res) => {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
      }

      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token invalido' });
        }
        const cedula = decoded.cedula;
        const sql = 'SELECT cedula, nombres, apellidos, tipodocumento, correo FROM usuarios WHERE cedula = ?';
        db.query(sql, [cedula], (err, results) => {
          if (err) {
            return res.status(500).send('Error al ejecutar la consulta');
          }
  
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.status(404).json({ message: 'Usuario no encontrado' })
          }
        });
      });
    });

    router.put('/actualizar-usuario', (req, res) => {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
      }
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token invalido' });
        }

        const { nombres, apellidos, tipodocumento, correo } = req.body;
        const cedula = decoded.cedula;

        const sql = 'UPDATE usuarios SET nombres = ?, apellidos = ?, tipodocumento = ?, correo = ? WHERE cedula = ?';
        db.query(sql, [ nombres, apellidos, tipodocumento, correo, cedula ], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Error al actualizar los datos' });
          }

          res.json({ success: true, message: 'Datos actualizados correctamente' });
        });
      });
    });
    return router;
};

module.exports = userRoutes;