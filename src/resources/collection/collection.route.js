import express from 'express';
import { deserializeUser } from '../user/user.middleware.js';
import CollectionController from './collection.controller.js';
const router = express.Router();
const collectionController = new CollectionController()
router.post('/',deserializeUser,collectionController.create);
router.put('/:_id',deserializeUser,collectionController.updateCollection);
router.get('/:_id', collectionController.getCollectionById);
router.get('/user/:userId', collectionController.getCollectionListByUser);
router.delete('/:_id',deserializeUser,collectionController.deleteCollection);
export default router;