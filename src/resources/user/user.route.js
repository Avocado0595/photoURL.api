import express from 'express';
import requireUpload from '../../middlewares/image.middleware.js';
import UserController from './user.controller.js';
import { requireUser } from './user.middleware.js';
const router = express.Router();
const userController = new UserController();

router.get('/:userId', userController.getUser);
router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.post('/new-pasword', userController.getNewPassword);

router.patch('/update-password',requireUser, userController.updatePassword);
router.put('/update-info',requireUser, userController.updateUser);
router.post('/update-avatar',requireUser, requireUpload, userController.updateAvatar)
router.delete('/signout',requireUser, userController.signout);

export default router;