const express = require('express');

const router = express.Router();

const escaneosCondu = (db) => {
  router.get('/:rutaNombre/:cedula', (req, res) => {
    const { cedula, rutaNombre } = req.params;
    console.log('cedula recibida:', cedula); // Depurar el valor

    const sql = `
      SELECT 
        e.cedula,
        u.nombres,
        u.apellidos,
        p.nombre AS puntoscontrol,
        e.hora,
        e.minutos_retraso,
        e.sanciones,
        p.ultimo
      FROM 
        escaneos AS e
      INNER JOIN 
        usuarios AS u ON e.cedula = u.cedula
      INNER JOIN
        puntoscontrol As p ON e.codigo_puntoscontrol = p.codigo
      WHERE 
        e.cedula = ?
    `;

    db.promise().query(sql, [cedula, rutaNombre])
      .then(([rows]) => {
        if (rows.length > 0) {
          res.json(rows);
        } else {
          res.status(404).json({ message: 'No se encontraron resultados' });
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos de control:', error);
        res.status(500).json({ message: 'Error al obtener los datos de control' });
      })
  })
  return router;
}

module.exports = escaneosCondu;