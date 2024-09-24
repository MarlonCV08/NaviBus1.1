const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const vehicleForm = (db) => {
  router.post('/', [
    body('placa').notEmpty().withMessage('La placa es obligatoria'),
    body('modelo').notEmpty().withMessage('El modelo es obligatorio'),
    body('numchasis').notEmpty().withMessage('El número de chasis es obligatorio'),
    body('nummotor').notEmpty().withMessage('El número de motor es obligatorio'),
    body('numpasajeros').isInt({ gt: 0 }).withMessage('El número de pasajeros debe ser un número positivo'),
    body('cilindrada').isFloat({ gt: 0 }).withMessage('La cilindrada debe ser un número positivo'),
    body('marca').notEmpty().withMessage('La marca es obligatoria'),
    body('linea').notEmpty().withMessage('La línea es obligatoria'),
    body('clasevehiculo').notEmpty().withMessage('La clase de vehículo es obligatoria'),
  ], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { placa, marca, linea, clasevehiculo, modelo, numchasis, nummotor, numpasajeros, cilindrada } = req.body;
    console.log('Datos recibidos:', { placa, marca, linea, clasevehiculo, modelo, numchasis, nummotor, numpasajeros, cilindrada });

    //Buscar el codigo de la marca
    const sqlMarca = 'SELECT codigo FROM marca WHERE codigo = ?';
    db.query(sqlMarca, [marca], (err, results) => {
      if (err) {
        console.error('Error al obtener el codigo de la marca:', err);
        return res.status(500).json({ error: 'Error al buscar el codigo de la marca' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Codigo de marca no encontrado' });
      }

      const codigoMarca = results[0].codigo;

      //Buscar el codigo de la linea usando el codigo de la marca
      const sqlLinea = 'SELECT codigo FROM linea WHERE codigo = ? AND marca = ?';
      db.query(sqlLinea, [linea, codigoMarca], (err, results) => {
        if (err) {
          console.error('Error al obtener el codigo de la linea:', err);
          return res.status(500).json({ error: 'Error al buscar el codigo de la linea' });
        }
        if(results.length === 0) {
          return res.status(404).json({ error: 'No se encontro la combinacion de linea y marca' });
        }
        const codigoLinea = results[0].codigo;

        //Insertar datos del vehiculo con el codigo de la linea
        const sqlVehiculo = `INSERT INTO vehiculo (placa, linea, clasevehiculo, modelo, numchasis, nummotor, numpasajeros,cilindrada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sqlVehiculo, [placa, codigoLinea, clasevehiculo, modelo, numchasis, nummotor, numpasajeros, cilindrada], (err,results) => {
          if (err) {
            console.error('Error al insertar el vehiculo:', err);
            return res.status(500).json({ error: 'Error al registrar el vehiculo' });
          }
          res.status(201).json({ success: true, message: 'Vehiculo creado con exito' });
        });
      });
    });
  });
  return router;
};
module.exports = vehicleForm;