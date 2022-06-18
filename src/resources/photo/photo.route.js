import express from 'express';
import PhotoController from './photo.controller.js';
const photoController = new PhotoController();
const router = express.Router();
router.get('/user/:userId', photoController.getPhotoListByUser);
router.get('/collection/:collectionId', photoController.getPhotoListByCollection);
router.get('/:photoId', photoController.getPhotoById);
router.get('/', photoController.getPhotoList);
//always need auth
router.post('/', photoController.create);
router.put('/:photoId', photoController.update);
router.delete('/:photoId', photoController.delete);
router.patch('/:photoId/like', photoController.like);
export default router;