import collectionModel from './collection.model.js';
export default class CollectionService{
    create = async(params)=> {
        const collection = await new collectionModel(params);
        if(!collection){
            throw new Error('Fail to add new collection.');
        }
        await collection.save();
        return collection;
    }
    
    getCollectionListByUser = async (userId)=>{
        const collectionList = await collectionModel.find({userId})
                                .populate({path:'userId', select: '_id userName avatarPath'});
        if(!collectionList)
            throw new Error('Not found collection with user');
        return collectionList;
    }
    getCollectionById = async(_id)=>{
        const collection = await collectionModel.findById(_id)
                        .populate({path:'userId', select: '_id userName avatarPath'});;
        if(!collection)
            throw new Error('Collection not found for read.');
        return collection;
    }
    
    updateCollection = async(_id, collectionName)=>{
        const collection = await collectionModel.findByIdAndUpdate(_id,{collectionName}, {new: true});
        if(!collection)
            throw new Error('Collection not found for update.');
        return collection;
    }
    
    deleteCollection = async(_id)=>{
        const delItem = await collectionModel.findByIdAndDelete(_id);
        if(!delItem)
            throw new Error('Collection not found for delete.');
        return delItem;
    }
    
}