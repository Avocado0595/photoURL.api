import express from 'express';
import CollectionController from './collection.controller.js';
const router = express.Router();
const collectionController = new CollectionController()
router.get('/:_id', collectionController.getCollectionById);
router.get('/user/:userId', collectionController.getCollectionListByUser);
//always need auth
router.post('/',collectionController.create);
router.put('/:_id',collectionController.updateCollection);
router.delete('/:_id',collectionController.deleteCollection);
export default router;