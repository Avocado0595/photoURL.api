import express from 'express';
import UserController from './user.controller.js';
import { deserializeUser } from './user.middleware.js';
const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.createUser);
router.delete('/signout', userController.signout);
router.post('/login', userController.login);
router.post('/new-pasword', userController.getNewPassword);
router.get('/me', userController.getMyAccount);
router.put('/update', userController.updateUser);
router.patch('/change-password', userController.updatePassword);

router.get('/profile/:userName', userController.getUserByUserName);

export default router;