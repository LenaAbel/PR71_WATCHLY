const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth_middleware');

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.put('/profile', verifyToken, userController.updateProfile);

// Generic routes after specific ones
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
