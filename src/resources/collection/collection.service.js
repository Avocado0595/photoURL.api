import collectionRepo from './collection.repo.js';

async function create(params) {
    return await collectionRepo.create(params);
}
async function getCollectionById(_id) {
    return await collectionRepo.getCollectionById(_id);
}
async function getCollectionListByUser(userId){
    return await collectionRepo.getCollectionListByUser(userId);
}
async function updateCollection(_id, collectionName){
    return await collectionRepo.updateCollection(_id, collectionName);
}
async function deleteCollection(_id){
    return await collectionRepo.deleteCollection(_id);
}
const collectionService = {create, getCollectionById, getCollectionListByUser, updateCollection, deleteCollection}
export default collectionService;
