const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No se proporcionó el token' });
  }

  // Asegúrate de que el formato del token sea "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'El formato del token es incorrecto' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded; // Se agrega la info del usuario al request
    next();
  });
};
