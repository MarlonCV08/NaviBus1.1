const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const recuperarClave = (db) => {
  router.post('/', (req, res) => {
    const { email } = req.body;

    console.log('Email recibido:', email);

    // Usamos callbacks para la consulta a la base de datos
    db.query('SELECT cedula FROM usuarios WHERE correo = ?', [email], (err, results) => {
      if (err) {
        console.error('Error en la consulta a la base de datos:', err);
        return res.status(500).json({ success: false, message: 'Error del servidor.' });
      }

      if (results.length > 0) {
        const { cedula } = results[0];

        // Configuramos el transporte de nodemailer
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'stevensanchez1024@gmail.com',
            pass: 'kppg bhau qnfu wpjp',
          },
        });

        // Opciones del correo
        let mailOptions = {
          from: 'stevensanchez1024@gmail.com',
          to: email,
          subject: 'Recordatorio de clave',
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #4CAF50;">Recordatorio de clave</h2>
              <p>Estimado usuario,</p>
              <p>Hemos recibido una solicitud para el recordatorio de tu clave. A continuación encontrarás tus datos:</p>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Usuario</th>
                  <td style="padding: 8px;">${cedula}</td>
                </tr>
                <tr>
                  <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Clave</th>
                  <td style="padding: 8px;">${cedula}</td>
                </tr>
              </table>

              <p>Si no has solicitado esta recuperación, por favor ignora este correo.</p>
              
              <p style="margin-top: 20px;">Saludos cordiales,<br>
              <strong>El equipo de NaviBus</strong></p>
            </div>
          `,
        };

        // Enviamos el correo usando callbacks
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ success: false, message: 'Error al enviar el correo.' });
          }
          console.log('Correo enviado:', info.response);
          res.status(200).json({ success: true, message: 'Correo enviado correctamente.' });
        });
      } else {
        // Si no se encuentra el correo en la base de datos
        res.status(404).json({ success: false, message: 'Correo no encontrado.' });
      }
    });
  });

  return router;
};

module.exports = recuperarClave;
