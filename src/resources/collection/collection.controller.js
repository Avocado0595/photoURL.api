import createResponse from '../../utils/response.ulti.js';
import CollectionService from "./collection.service.js";

export default class CollectionController{
    collectionService = new CollectionService();
    //POST '/'
    create = async (req, res)=>{    
        try{
            const {collectionName} = req.body;
            const userId = req.user.userId;
            if(collectionName.trim().length >= 125 || collectionName.trim().length <1)
                throw new Error('Invalid collection name.');
            const collection = await this.collectionService.create({collectionName, userId});
            res.status(201).json(createResponse(true,"Create new collection successfully.",{collection}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //PUT '/:_id'
    updateCollection= async (req,res)=>{
        try{
            const _id = req.params._id;
            const {collectionName} = req.body
            if(!collectionName)
                throw new Error("Data update empty.");
            const oldCollection = await this.collectionService.getCollectionById(_id);
            if(!req.user || oldCollection.user._id != req.user.userId)
                throw new Error("Invalid token."); 
            const collection = await this.collectionService.updateCollection(_id, collectionName)
            res.status(201).json(createResponse(true,"Update collection successfully.",{collection}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //GET '/:_id'
    getCollectionById = async(req, res)=>{
        try{
            const _id = req.params._id;
            const collection = await this.collectionService.getCollectionById(_id);
            res.status(201).json(createResponse(true,"Get collection successfully.",{collection}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //GET '/user/:userId'
    getCollectionListByUser = async (req, res)=>{
        try{
            const userId = req.params.userId;
            const collectionList = await this.collectionService.getCollectionListByUser(userId)
            res.status(201).json(createResponse(true,"Get collection successfully.",{collectionList}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //DELETE '/:_id'
    deleteCollection = async(req, res)=>{
        try{
            const _id = req.params._id;

            if(!_id)
                throw new Error("Data update empty.");
            const delCollection = await this.collectionService.getCollectionById(_id);
            if(delCollection.user._id != req.user.userId)
                throw new Error("Invalid token."); 
            const collection = await this.collectionService.deleteCollection(_id)
            res.status(201).json(createResponse(true,"Delete collection successfully.",{collection}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }
}
