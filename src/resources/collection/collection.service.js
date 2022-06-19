import collectionModel from './collection.model.js';
import photoModel from '../photo/photo.model.js';
export default class CollectionService{
    getCollectionById = async(_id, userId)=>{
        const collection = await collectionModel.findById(_id)
                        .populate({path:'userId', select: '_id userName avatarPath'});
        if(!collection)
            throw new Error('Collection not found.');
        if(!collection.isPrivate)
        {
            return collection;
        }
        if(collection.userId._id.toString() === userId){
            return collection;
        }
        else{
            throw new Error('Invalid access.')
        }
    }

    getCollectionListByUser = async (userId, authorId)=>{
        const rawCollectionList = await collectionModel.find({userId})
                                .populate({path:'userId', select: '_id userName avatarPath'});
        if(!rawCollectionList)
            throw new Error(`Collection not found with userid: ${userId}`);
        const collectionList = rawCollectionList.filter(c=>{
            if(!c.isPrivate){
                return true;
            }
            if(c.userId._id.toString() === authorId){
                return true;
            }
            return false;
        })
        return collectionList;
    }

    create = async(params)=> {
        const collection = await new collectionModel(params);
        if(!collection){
            throw new Error('Fail to add new collection.');
        }
        await collection.save();
        return collection;
    }
    
    updateCollection = async(_id,userId, params)=>{
        const collection = await collectionModel.findOneAndUpdate({_id, userId},{...params}, {new: true});
        if(!collection)
            throw new Error('Collection not found for update.');
        return collection;
    }
    
    deleteCollection = async(_id, userId)=>{
        const delItem = await collectionModel.findOneAndDelete({_id, userId});
        if(!delItem)
            throw new Error('Collection not found for delete.');
        await photoModel.deleteMany({collectionId: delItem._id})
        return delItem;
    }
    
}