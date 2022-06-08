import express from 'express';
import UserController from './user.controller.js';
import { deserializeUser } from './user.middleware.js';
const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

router.get('/me',deserializeUser, userController.getMyAccount);
router.put('/update',deserializeUser, userController.updateUser);
router.patch('/change_password',deserializeUser, userController.updatePassword);

router.get('/profile/:userName', userController.getUserByUserName);

export default router;