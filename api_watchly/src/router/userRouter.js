const express = require('express');
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.post('/users', authMiddleware, userController.createUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;