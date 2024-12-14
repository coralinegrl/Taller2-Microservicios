const jwt = require('jsonwebtoken');

const payload = {
  user_id: 1, // ID del usuario
  email: 'sebastian@example.com' // Correo electrónico del usuario
};

const secret = 'tu_secreto_super_secreto'; // El mismo que tienes en tu archivo .env
const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // El token expira en 1 hora

console.log('Token JWT generado:', token);
