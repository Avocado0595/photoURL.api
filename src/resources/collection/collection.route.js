import express from 'express';
import CollectionController from './collection.controller.js';
import { requireUser } from '../user/user.middleware.js';
const router = express.Router();
const collectionController = new CollectionController()
router.get('/:collectionId', collectionController.getCollectionById);
router.get('/user/:userId', collectionController.getCollectionListByUser);
//always need auth
router.post('/',requireUser,collectionController.create);
router.put('/:collectionId',requireUser,collectionController.updateCollection);
router.delete('/:collectionId', requireUser,collectionController.deleteCollection);
export default router;