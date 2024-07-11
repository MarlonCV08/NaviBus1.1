import express from 'express';

const router = express.Router();
 
const userRoutes = (db) => {
  router.get('/', async(req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM login');

      res.json(rows);
    } catch (err) {
      console.error("Error al obtener los usuarios: ", err)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  });
  return router;
};

export default userRoutes;