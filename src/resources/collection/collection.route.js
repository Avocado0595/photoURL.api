import express from 'express';
import CollectionController from './collection.controller.js';
import { requireUser } from '../user/user.middleware.js';
const router = express.Router();
const collectionController = new CollectionController()
router.get('/:_id', collectionController.getCollectionById);
router.get('/user/:userId', collectionController.getCollectionListByUser);
//always need auth
router.post('/',requireUser,collectionController.create);
router.put('/:_id',requireUser,collectionController.updateCollection);
router.delete('/:_id', requireUser,collectionController.deleteCollection);
export default router;