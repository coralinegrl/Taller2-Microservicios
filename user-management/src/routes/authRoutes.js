const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

// 🚀 Proteger todas las rutas con el middleware `authenticateToken`
router.post('/usuarios', authenticateToken, userController.createUser);
router.get('/usuarios/:id', authenticateToken, userController.getUser);
router.put('/usuarios/:id', authenticateToken, userController.updateUser);
router.delete('/usuarios/:id', authenticateToken, userController.deleteUser);

module.exports = router;
