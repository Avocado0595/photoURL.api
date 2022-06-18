import express from 'express';
import UserController from './user.controller.js';
import { requireUser } from './user.middleware.js';
const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.post('/new-pasword', userController.getNewPassword);
router.get('/profile/:_id', userController.getUser);

router.delete('/signout',requireUser, userController.signout);
router.patch('/change-password',requireUser, userController.updatePassword);
router.put('/update',requireUser, userController.updateUser);

export default router;