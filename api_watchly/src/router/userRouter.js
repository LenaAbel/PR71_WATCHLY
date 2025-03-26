const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

module.exports = userRouter;
