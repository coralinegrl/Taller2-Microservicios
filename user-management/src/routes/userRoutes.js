const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/usuarios', userController.createUser);
router.get('/usuarios/:id', userController.getUser);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);

module.exports = router;
