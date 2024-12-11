const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // 1️⃣ Obtiene el token de la cabecera Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  // 2️⃣ Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    req.user = user; // El usuario autenticado estará disponible en req.user
    next();
  });
};

module.exports = authenticateToken;
