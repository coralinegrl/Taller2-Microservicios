const express = require('express');
const router = express.Router();
const { register, login, updatePassword, logout } = require('../controllers/authController');
const app = express();

// Definir las rutas con los controladores correctos
router.post('/register', register);

  
router.post('/login', (req, res, next) => {
    console.log('Solicitud recibida en /auth/login:', req.body);
    next();
}, login);

router.put('/update-password', updatePassword);
router.post('/logout', logout);

module.exports = router;

