const express = require('express');
const router = express.Router();
const { register, login, updatePassword, logout } = require('../controllers/authController');

// Definir las rutas con los controladores correctos
router.post('/register', register);
router.post('/login', login);
router.put('/update-password', updatePassword);
router.post('/logout', logout);

module.exports = router;

