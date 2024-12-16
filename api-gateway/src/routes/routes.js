const express = require('express');
const router = express.Router();
const axios = require('axios');
const { routeToUserService, routeToMonolith } = require('../controllers/gatewayController');
const authMiddleware = require('../middlewares/authMiddleware');
const careerClient = require('../grpc/careerClient');
const app = express();

// Rutas para User Service (usando gRPC)
router.use('/user-service', authMiddleware, routeToUserService);

// Rutas para el Monolito (usando HTTP)
router.use('/monolith', routeToMonolith);

router.get('/', (req, res) => {
    res.send('API Gateway funcionando correctamente');
});

// gRPC: Obtener una carrera por ID
router.get('/careers/:id', (req, res) => {
    const { id } = req.params;
    careerClient.GetCareer({ id }, (error, response) => {
        if (error) {
            console.error('Error en la llamada gRPC:', error);
            return res.status(500).send(error);
        }
        res.json(response);
    });
});

app.post('/access/register', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3003/access/register', req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error en el API Gateway', error: error.message });
    }
});



module.exports = router;
