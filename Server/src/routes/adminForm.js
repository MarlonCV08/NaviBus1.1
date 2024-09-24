const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const adminForm = (db) => {
  router.post('/', [
    body('nombres').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
    body('tipodocumento').notEmpty().withMessage('El tipo de documento es obligatorio'),
    body('cedula').notEmpty().withMessage('El documento es obligatorio'),
    body('correo').notEmpty().withMessage('El correo es obligatorio'),
  ], (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cedula, nombres, apellidos, tipodocumento, correo, rol } = req.body;
    console.log('Datos recibidos:', { cedula, nombres, apellidos, tipodocumento, correo, rol });
  
    const clave = cedula;
  
    const sql = `INSERT INTO usuarios (cedula, nombres, apellidos, tipodocumento, correo, rol, clave)
    VALUES (?, ?, ?, ?, ?, ?, ?)`
  
    db.query(sql, [cedula, nombres, apellidos, tipodocumento, correo, rol, clave], (err, results) => {
      if (err) {
        console.error('Error al insertar los datos:', err);
        return res.status(500).json({ error: 'Error al insertar los datos en la base de datos' })
      }
      res.status(201).json({ success: true, message: 'Administrador creado con exito' });
    });
  });
  return router;
}

module.exports = adminForm;