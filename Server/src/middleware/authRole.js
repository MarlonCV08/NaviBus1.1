const jwt = require('jsonwebtoken');

const authRole = (allowedRoles) => {
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
        next();
      } else {
        return res.status(403).json({ message: 'No tienes permisos suficientes' });
      }
    } catch(err) {
      res.status(401).json({ message: 'Token invalido' });
    }
  }
}

module.exports = authRole;