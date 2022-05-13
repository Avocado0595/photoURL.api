import express from 'express';
import collectionController from './collection.controller.js';
import { verifyToken } from '../user/user.middleware.js';
const router = express.Router();

router.post('/',verifyToken,collectionController.create);
router.put('/:_id',verifyToken,collectionController.updateCollection);
router.get('/:_id', collectionController.getCollectionById);
router.get('/user/:userId', collectionController.getCollectionListByUser);


export default router;