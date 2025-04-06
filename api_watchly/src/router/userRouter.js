const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth_middleware');

const userRouter = express.Router();

// Auth routes first
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

// Protected routes
userRouter.use(verifyToken);
userRouter.put('/profile', userController.updateProfile);
userRouter.get('/profile-pictures', userController.getDefaultProfilePictures);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/:id/picture', userController.getUserPicture);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
