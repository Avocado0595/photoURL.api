
import {urlPattern} from './photo.helper.js';
import createResponse from '../../utils/response.ulti.js';
import PhotoService from './photo.service.js';
export default class photoController{
    constructor(){
        this.photoService = new PhotoService();
    };

    getUserPhotoById = async (req, res)=>{
        try{
            const userName=req.params.userName;
            const _id= req.params.photoId;
            const photoList = await this.photoService.getUserPhotoById({userName,_id});
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }

    create = async (req, res) =>{    
        try{
            const {photoUrl, photoName,collectionId } = req.body;
            const userName = req.userName;
            if(!photoUrl.match(urlPattern))
                throw new Error('Invalid photo url.');
            const photo = await this.photoService.createPhoto({photoUrl, photoName,collectionId,userName});
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
            const photoList = await this.photoService.getPhotoList(userName);
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
    getPhotoList = async(req, res)=>{
        try{
            let {page=1, limit=10, offset=10, search} = req.query
            page = parseInt(page);
            limit = parseInt(limit);
            offset = parseInt(offset);
            const photoList = await this.photoService.getPhoto({page, limit, offset, search});
            res.status(201).json(createResponse(true, "Get list photo successfully.", photoList));
        }
        catch(err){
            res.status(400).json(createResponse(false, err.message, null))
        }
    }
}

