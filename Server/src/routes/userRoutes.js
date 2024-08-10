const express = require('express');

const router = express.Router();
 
const userRoutes = (db) => {
  router.get('/conductores', (req, res)=> {
    const sql = 'SELECT * FROM conductor';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error al ejecutar la consulta');
        return;
      }
      res.json(results);
    });
  });
  return router;
};

module.exports = userRoutes;