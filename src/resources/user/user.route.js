import express from 'express';
import userController from './user.controller.js';
import { verifyToken } from './user.middleware.js';
const router = express.Router();

router.get('/', (req,res)=>res.status(200).json({message:'ok'}));
router.post('/create', userController.createUser);
router.post('/login', userController.login);
router.get('/:_id',verifyToken, userController.getUserById);
router.put('/:_id',verifyToken, userController.updateUser);
router.put('/password/:_id',verifyToken, userController.updatePassword);

export default router;