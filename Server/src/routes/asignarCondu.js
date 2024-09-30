const express = require('express');
const db = require("../db");

const router = express.Router();

const asignarCondu = (db) => {
  router.post('/', async (req, res) => {
    const asignaciones = req.body; // Asegúrate de que req.body se esté recibiendo correctamente

    const promises = Object.entries(asignaciones).map(([cedula, rutaId]) => {
      return new Promise((resolve) => {
        // Verificar si la asignación ya existe
        db.query('SELECT * FROM ruta_usuarios WHERE cedula = ?', [ cedula], (error, results) => {
          if (error) {
            console.error('Error en la base de datos: ' + error.message);
            return resolve({ error: 'Error en la base de datos: ' + error.message });
          }
          if (results.length > 0) {
           console.error(`El conductor ${cedula} ya está asignado a una ruta`);
           return resolve({ error: `El conductor ${cedula} ya está asignado a una ruta` });
          }
          // Verificar si el conductor existe
          db.query('SELECT * FROM usuarios WHERE cedula = ? AND rol= 2', [cedula], (error, results) => {
            if (error) {
              console.error('Error en la base de datos: ' + error.message);
              return resolve({ error: 'Error en la base de datos: ' + error.message });
            }
            if (results.length === 0) {
              console.error(`Conductor no encontrado o no válido: ${cedula}`);
              return resolve({ error: `Conductor no encontrado o no válido: ${cedula}` });
            }
            // Realizar la inserción
            db.query('INSERT INTO ruta_usuarios (ruta_codigo, cedula) VALUES (?, ?)', [rutaId, cedula], (error) => {
              if (error) {
                // Captura el error de clave duplicada y otros errores
                console.error(`Error al asignar ruta a conductor ${cedula}: ${error.message}`);
                return resolve({ error: `Error al asignar ruta a conductor ${cedula}: ${error.message}` });
              }
              console.log(`Ruta ${rutaId} asignada a conductor ${cedula} correctamente`);
              resolve({ success: `Ruta ${rutaId} asignada a conductor ${cedula} correctamente` });
            });
          });
        });
      });
    });

    try {
      const results = await Promise.all(promises);
      const errors = results.filter(result => result.error); // Filtrar errores
      const successes = results.filter(result => result.success); // Filtrar éxitos

      // Responder con los resultados
      return res.status(200).json({
        message: 'Proceso completado',
        successes: successes.map(success => success.success),
        errors: errors.map(err => err.error),
      });
    } catch (err) {
      return res.status(500).json({ message: 'Error en la base de datos: ' + err.message });
    }
  });

  return router;
};

module.exports = asignarCondu;