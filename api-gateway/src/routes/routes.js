const express = require('express');
const router = express.Router();
const { routeToUserService, routeToMonolith } = require('../controllers/gatewayController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas para User Service (usando gRPC)
router.use('/user-service', authMiddleware, routeToUserService);

// Rutas para el Monolito (usando HTTP)
router.use('/monolith', routeToMonolith);

module.exports = router;
