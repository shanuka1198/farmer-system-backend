const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController.js');
const userVerify = require('../middleware/verifyToken.js');

userRouter.post('/auth/register', userController.userRegister);
userRouter.post('/auth/login', userController.userLogin);

userRouter.get('/',userVerify, userController.getAllUsers);
userRouter.get('/:id',userVerify, userController.getUserById);
userRouter.put('/:id',userVerify, userController.updateUser);
userRouter.delete('/:id',userVerify, userController.deleteUser);

module.exports = userRouter;
