import express from 'express';
import PhotoController from './photo.controller.js';
import { requireUser } from '../user/user.middleware.js';
const photoController = new PhotoController();
const router = express.Router();
router.get('/user/:userId', photoController.getPhotoListByUser);
router.get('/collection/:collectionId', photoController.getPhotoListByCollection);
router.get('/:photoId', photoController.getPhotoById);
router.get('/', photoController.getPhotoList);
//always need auth
router.post('/', requireUser,photoController.create);
router.put('/:photoId',requireUser, photoController.update);
router.delete('/:photoId',requireUser, photoController.delete);
router.patch('/:photoId/like',requireUser, photoController.like);
export default router;