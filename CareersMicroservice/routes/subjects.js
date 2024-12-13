const express = require('express');
const { getAllSubjects, createSubject } = require('../controllers/subjectController');

const router = express.Router();

router.get('/', getAllSubjects);
router.post('/', createSubject);

module.exports = router;
