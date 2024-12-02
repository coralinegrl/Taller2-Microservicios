const express = require('express');
const { getAllCareers, createCareer } = require('../controllers/careerController');

const router = express.Router();

router.get('/', getAllCareers);
router.post('/', createCareer);

module.exports = router;
