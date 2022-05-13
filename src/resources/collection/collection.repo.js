import collectionModel from './collection.model.js';

async function create(params) {
    const collection = await new collectionModel(params);
    if(!collection){
        throw new Error('Fail to add new collection.');
    }
    await collection.save();
    return collection;
}

async function getCollectionListByUser(userId){
    const collectionList = await collectionModel.find({userId});
    if(!collectionList)
        throw new Error('Not found collection with user');
    return collectionList;
}

async function getCollectionById(_id){
    const collection = await collectionModel.findById(_id);
    if(!collection)
        throw new Error('Collection not found for read.');
    return collection;
}

async function updateCollection(_id, collectionName){
    const collection = await collectionModel.findByIdAndUpdate(_id,{collectionName}, {new: true});
    if(!collection)
        throw new Error('Collection not found for update.');
    return collection;
}

async function deleteCollection(_id){
    const delItem = await collectionModel.findByIdAndDelete(_id);
    if(!delItem)
        throw new Error('Collection not found for delete.');
    return delItem;
}


const collectionRepo = { create, getCollectionById, getCollectionListByUser, updateCollection, deleteCollection};
export default collectionRepo;