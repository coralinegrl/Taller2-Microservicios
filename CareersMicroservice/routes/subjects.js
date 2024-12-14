const express = require('express');
const {
    getAllSubjects,
    getPrerequisitesMapObjects,
    getPrerequisitesMap,
    getPostrequisitesMap
} = require('../controllers/subjectController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validateSubjectRequest } = require('../validators/subjectValidator');

const router = express.Router();

// Obtener todas las asignaturas
router.get('/', authenticateToken, validateSubjectRequest, getAllSubjects);

// Obtener el mapa de prerrequisitos con objetos
router.get('/prerequisites-map/objects', authenticateToken, getPrerequisitesMapObjects);

// Obtener el mapa de prerrequisitos
router.get('/prerequisites-map', authenticateToken, getPrerequisitesMap);

// Obtener el mapa de postrequisitos
router.get('/postrequisites-map', authenticateToken, getPostrequisitesMap);

module.exports = router;
