import createResponse from '../../utils/response.ulti.js';
import CollectionService from "./collection.service.js";

export default class CollectionController{
    collectionService = new CollectionService();
    //GET /collections/:collectionId
    getCollectionById = async(req, res)=>{
        try{
            const _id = req.params.collectionId;
            const userId = req.user?.userId;
            const collection = await this.collectionService.getCollectionById(_id, userId);
            return res.status(200).json(createResponse(true,"Get collection successfully.",{collection}));
        }
        catch(err){
            if(err.message.includes('Invalid access'))
                return res.status(403).json(createResponse(false,err.message,null));
            return res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //GET /collections/user/:userId
    getCollectionListByUser = async (req, res)=>{
        try{
            const userId = req.params.userId;
            const authorId = req.user?.userId;
            const collectionList = await this.collectionService.getCollectionListByUser(userId, authorId)
            return res.status(200).json(createResponse(true,"Get collection successfully.",{collectionList}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //POST /collections/
    create = async (req, res)=>{    
        try{
            const {collectionName, isPrivate} = req.body;
            const userId = req.user.userId;
            if(collectionName.trim().length >= 125 || collectionName.trim().length <1)
                throw new Error('Invalid collection name.');
            const collection = await this.collectionService.create({collectionName, userId, isPrivate});
            return res.status(201).json(createResponse(true,"Create new collection successfully.",{collection}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //PUT '/:collectionId'
    updateCollection= async (req,res)=>{
        try{
            const _id = req.params.collectionId;
            const userId = req.user.userId;
            const {collectionName, isPrivate} = req.body
            if(!collectionName)
                throw new Error("Data update empty.");
            const collection = await this.collectionService.updateCollection(_id,userId, {collectionName, isPrivate});
            return res.status(201).json(createResponse(true,"Update collection successfully.",{collection}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null));
        }
    }
    
    
    //DELETE '/:collectionId'
    deleteCollection = async(req, res)=>{
        try{
            const _id = req.params.collectionId;
            const userId = req.user.userId;
            const collection = await this.collectionService.deleteCollection(_id, userId);
            return res.status(200).json(createResponse(true,"Delete collection successfully.",{collection}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null));
        }
    }
}
