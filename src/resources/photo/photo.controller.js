
import {urlPattern} from './photo.helper.js';
import createResponse from '../../utils/response.ulti.js';
import PhotoService from './photo.service.js';
export default class photoController{
    constructor(){
        this.photoService = new PhotoService();
    };

    getPhotoById = async (req, res)=>{
        try{
            const _id= req.params.photoId;
            const photo = await this.photoService.getPhotoById(_id);
            res.status(201).json(createResponse(true, "Get photo successfully.", photo));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }

    create = async (req, res) =>{    
        try{
            const {photoUrl, photoName,collectionId } = req.body;
            const userId = req.user.userId;
            if(!photoUrl.match(urlPattern))
                throw new Error('Invalid photo url.');
            const photo = await this.photoService.createPhoto({photoUrl, photoName,collectionId,userId});
            res.status(201).json(createResponse(true,"Create new photo successfully.",photo));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }

    getMyPhotoById = async(req,res)=>{
        try{
            const _id = req.params._id;
            const photo = await this.photoService.getPhotoId(_id);
            res.status(201).json(createResponse(true, "Get photo successfully.", photo));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }

    getMyPhotoList = async(req, res)=>{
        try{
            const userName = req.userName;
            const photoList = await this.photoService.getPhotoList(userName);
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    getUserPhotoList = async(req, res)=>{
        try{
            const userName = req.params.userName;
            const photoList = await this.photoService.getUserPhotoList(userName);
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    getPhotoList = async(req, res)=>{
        try{
            let {page=1, limit=10, skip=10, search} = req.query
            page = parseInt(page);
            limit = parseInt(limit);
            skip = parseInt(skip);
            const photoList = await this.photoService.getPhotoList({page, limit, skip, search});
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
}

