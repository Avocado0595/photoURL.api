
import {urlPattern} from './photo.helper.js';
import createResponse from '../../utils/response.ulti.js';
import PhotoService from './photo.service.js';
import { getQueryParams } from './photo.helper.js';
export default class photoController{
    constructor(){
        this.photoService = new PhotoService();
    };
    //GET /photos/user/:userId
    getPhotoListByUser = async(req, res)=>{
        try{
            const userId = req.params.userId;
            const authId = req.user?.userId;
            const photoList = await this.photoService.getPhotoListByUser(userId, authId);
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null));
        }
    }
    //GET /photos/collection/:collectionId
    getPhotoListByCollection = async(req, res)=>{
        try{
            const queryParams = getQueryParams(req);
            const collectionId = req.params.collectionId;
            const userId = req.user?.userId;
            const photoList = await this.photoService.getPhotoListByCollection(collectionId, userId, queryParams);
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    //GET /photos/:photoId
    getPhotoById = async (req, res)=>{
        try{
            const _id= req.params.photoId;
            const userId = req.user?.userId;
            const photo = await this.photoService.getPhotoById(_id, userId);
            res.status(201).json(createResponse(true, "Get photo successfully.", photo));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    //GET /photos
    getPhotoList = async(req, res)=>{
        try{
            const queryParams = getQueryParams(req);
            const userId = req.user?.userId;
            const photoList = await this.photoService.getPhotoList(userId,queryParams);
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    //POST /photos
    create = async (req, res) =>{    
        try{
            const {photoUrl, photoName,collectionId, isPrivate } = req.body;
            const userId = req.user.userId;
            if(!photoUrl.match(urlPattern))
                throw new Error('Invalid photo url.');
            const photo = await this.photoService.createPhoto({photoUrl, photoName,collectionId,userId, isPrivate});
            res.status(201).json(createResponse(true,"Create new photo successfully.",photo));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //POST /:photoId
    update = async(req, res) =>{
        try{
            const photoId = req.params.photoId;
            const userId = req.user.userId;
            const {photoName,collectionId, isPrivate} = req.body;
            const photo = await this.photoService.updatePhoto(photoId, userId,{ photoName,collectionId, isPrivate });
            res.status(201).json(createResponse(true, "Update photo successfully.", photo));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    //DELETE /:photoId
    delete = async(req, res)=>{
        try{
            const photoId = req.params.photoId;
            const userId = req.user.userId;
            const photo = await this.photoService.deletePhoto(photoId, userId);
            res.status(201).json(createResponse(true, "Delete photo successfully.", photo));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    //PATCH /photo/:photoId/like
    like = async(req, res)=>{
        try{
            const user = req.user.userId;
            const photoId = req.params.photoId;
            const result = await this.photoService.like(user, photoId);
            res.status(201).json(createResponse(true, "Liked.",result ));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }

}

