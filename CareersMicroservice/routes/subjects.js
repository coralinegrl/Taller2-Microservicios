const express = require('express');
const {
    getAllSubjects,
    getPrerequisitesObjects,
    getPrerequisitesMap,
    getPostrequisitesMap
} = require('../controllers/subjectController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validateSubjectRequest } = require('../middlewares/subjectValidator');

const router = express.Router();

// Obtener todas las asignaturas
router.get('/', authenticateToken, validateSubjectRequest, getAllSubjects);

// Obtener el mapa de prerrequisitos con objetos
router.get('/prerequisites-map/objects', authenticateToken, getPrerequisitesObjects);

// Obtener el mapa de prerrequisitos
router.get('/prerequisites-map', authenticateToken, getPrerequisitesMap);

// Obtener el mapa de postrequisitos
router.get('/postrequisites-map', authenticateToken, getPostrequisitesMap);

module.exports = router;