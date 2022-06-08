import express from 'express';
import PhotoController from './photo.controller.js';
import {deserializeUser} from '../user/user.middleware.js'
const photoController = new PhotoController();
const router = express.Router();
router.get('/user/:userName', photoController.getUserPhotoList);
router.get('/:photoId', photoController.getPhotoById);

router.get('/', photoController.getPhotoList);
router.post('/',deserializeUser, photoController.create);

//router.get('/me',desirializeUser, photoController.getMyPhotoList);
//router.get('/:_id', photoController.getMyPhotoById);

export default router;