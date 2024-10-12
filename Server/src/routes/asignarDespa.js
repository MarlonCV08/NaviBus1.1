const express = require('express');

const router = express.Router();

const asignarDespa = (db) => {
  router.post('/', (req, res) => {
    const { cedula, puntoControl } = req.body;

    const sqlDespa = 'SELECT cedula FROM usuarios WHERE cedula = ? AND rol = 3';

    db.query(sqlDespa, [cedula], (error, results) => {
      if (error) {
        console.error('Error al obtener el despachador', error);
        return res.status(500).json({ error: 'Error al obtener el despachador' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Despachador no encontrado o no es un despachador' });
      }
      
      const cedulaDespa = results[0].cedula;

      const sqlInsert = 'INSERT INTO asignaciones (cedula, codigo_puntoscontrol) VALUES (?, ?)';
      db.query(sqlInsert, [cedulaDespa, puntoControl], (error, results) => {
        if (error) {
          console.error('Error al insertar la asignacion', error);
          return res.status(500).json({ error: 'Error al insertar la asignacion' });
        }

        res.status(201).json({ message: 'Asignacion creada correctamente' })
      });
    });
  });
  return router;
};

module.exports = asignarDespa;