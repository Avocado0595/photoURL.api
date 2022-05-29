import express from 'express';
import PhotoController from './photo.controller.js';
import {verifyToken} from '../user/user.middleware.js'
const photoController = new PhotoController();
const router = express.Router();
router.get('/', photoController.getPhotoList);
router.post('/',verifyToken, photoController.create);

router.get('/me',verifyToken, photoController.getMyPhotoList);
router.get('/me/:_id', photoController.getMyPhotoById);

router.get('/user/:userName/', photoController.getUserPhotoList);
router.get('/user/:userName/:photoId', photoController.getUserPhotoById);
export default router;