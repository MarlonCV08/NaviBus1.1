const express = require('express');
const db = require("../db");

const router = express.Router();

const asignarCondu = (db) => {
  router.post('/', (req, res) => {
    const asignaciones = req.body; // Asegúrate de que req.body se esté recibiendo correctamente
  
    const processAsignaciones = (asignaciones) => {
      for (const [cedula, rutaId] of Object.entries(asignaciones)) {
        db.query('SELECT * FROM usuarios WHERE cedula = ? AND rol= 2', [cedula], (error, results) => {
          if (error) {
            return res.status(500).json({ message: 'Error en la base de datos: ' + error.message });
          }
          if (results.length === 0) {
            console.error(`Conductor no encontrado o no válido: ${cedula}`);
            return;
          }
          
          db.query('INSERT INTO ruta_usuarios (ruta_codigo, cedula) VALUES (?, ?)', [rutaId, cedula], (error) => {
            if (error) {
              console.error(`Error al asignar ruta a conductor ${cedula}: ${error.message}`);
            } else {
              console.log(`Ruta ${rutaId} asignada a conductor ${cedula} correctamente`);
            }
          });
        });
      }
      // Responder al final
      res.status(200).json({ message: 'Asignaciones procesadas' });
    };

    processAsignaciones(asignaciones);
  });
  return router;
};

module.exports = asignarCondu;