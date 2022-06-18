import express from 'express';
import UserController from './user.controller.js';
const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.createUser);
router.delete('/signout', userController.signout);
router.post('/login', userController.login);
router.post('/new-pasword', userController.getNewPassword);
router.put('/update', userController.updateUser);
router.patch('/change-password', userController.updatePassword);
router.get('/profile/:_id', userController.getUser);

export default router;