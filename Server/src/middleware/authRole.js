const jwt = require('jsonwebtoken');

const authRole = (allowedRoles, db) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'Token no proporcionado.' });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (allowedRoles.includes(decoded.rol)) {
        req.user = decoded;
        return next();
      } else {
        return res.status(403).json({ message: 'No tienes permisos suficientes' });
      }
    } catch(err) {
      // Si el token ha expirado, eliminar los registros de ruta_usuarios
      if (err.name === 'TokenExpiredError') {
        const sql = 'DELETE FROM ruta_usuarios WHERE cedula = ?'; // Reemplaza con la condición adecuada
        const cedula = req.user?.cedula; // Asegúrate de que el cedula esté disponible

        db.query(sql, [cedula], (deleteErr) => {
          if (deleteErr) {
            console.error('Error al eliminar los datos de ruta_usuarios:', deleteErr);
          } else {
            console.log('Datos de ruta_usuarios eliminados correctamente.');
          }
          return res.status(401).json({ message: 'Token expirado. Datos eliminados.' });
        });
      } else {
        return res.status(401).json({ message: 'Token invalido' });
      }
    }
  };
};

module.exports = authRole;