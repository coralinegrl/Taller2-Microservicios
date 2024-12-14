const express = require('express');
const { getAllCareers, createCareer } = require('../controllers/careerController');
const { validateCareerRequest } = require('../middlewares/careerValidator');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, validateCareerRequest, getAllCareers);
router.post('/', createCareer);

module.exports = router;
