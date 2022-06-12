import express from 'express';
import PhotoController from './photo.controller.js';
import {deserializeUser} from '../user/user.middleware.js'
const photoController = new PhotoController();
const router = express.Router();
router.get('/user/:userId', photoController.getUserPhotoList);
router.get('/collection/:collectionId', photoController.getCollectionPhotoList);
router.get('/:photoId', photoController.getPhotoById);
router.get('/', photoController.getPhotoList);
router.post('/',deserializeUser, photoController.create);
router.put('/:photoId',deserializeUser, photoController.update);
router.delete('/:photoId',deserializeUser, photoController.delete);
router.patch('/:photoId/like',deserializeUser, photoController.like);
export default router;