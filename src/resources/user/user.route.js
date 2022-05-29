import express from 'express';
import UserController from './user.controller.js';
import { verifyToken } from './user.middleware.js';
const router = express.Router();
const userController = new UserController();
router.post('/auth/signup', userController.createUser);
router.post('/auth/login', userController.login);
router.get('/auth/me',verifyToken, userController.getMyAccount);
router.put('/auth/update',verifyToken, userController.updateUser);
router.patch('/auth/change_password',verifyToken, userController.updatePassword);

router.get('/:userName',verifyToken, userController.getUserByUserName);

export default router;