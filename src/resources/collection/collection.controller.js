import collectionService from "./collection.service.js";
import createResponse from '../../utils/response.ulti.js';

async function create(req, res){    
    try{
        const {collectionName} = req.body;
        const userId = req._id;
        if(collectionName.length >= 125 || collectionName.length <1)
            throw new Error('Invalid collection name.');
        const collection = await collectionService.create({collectionName, userId});
        res.status(201).json(createResponse(true,"Create new collection successfully.",{collection}));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message,null));
    }
}

async function getCollectionById(req, res){
    try{
        const _id = req.params._id;
        const collection = await collectionService.getCollectionById(_id);
        res.status(201).json(createResponse(true,"Get collection successfully.",{collection}));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message,null));
    }
}

async function getCollectionListByUser(req, res){
    try{
        const userId = req.params.userId;
        const collectionList = await collectionService.getCollectionListByUser(userId)
        res.status(201).json(createResponse(true,"Get collection successfully.",{collectionList}));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message,null));
    }
}
async function updateCollection(req,res){
    try{
        const _id = req.params._id;
        const {collectionName} = req.body
        if(!collectionName)
            throw new Error("Data update empty.");
        const userId = req._id;
        const oldCollection = await collectionService.getCollectionById(_id);
        if(oldCollection.userId != userId)
            throw new Error("Invalid token.");
        const collection = await collectionService.updateCollection(_id, collectionName)
        res.status(201).json(createResponse(true,"Update collection successfully.",{collection}));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message,null));
    }
}
async function deleteCollection(){

}
const collectionController = {create, getCollectionById, getCollectionListByUser, updateCollection, deleteCollection};
export default collectionController;