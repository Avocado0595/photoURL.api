import photo_userModel from './photo_user.model.js';
//ptus = photo_user
async function create(params) {
    const ptus = await new photo_userModel(params);
    if(!ptus){
        throw new Error('Fail to add new phot_user.');
    }
    await ptus.save();
    return ptus;
}

async function getUserByPhoto(photoId){
    const userList = await photo_userModel.find({photoId});
    if(!userList || userList.length ===0)
        throw new Error('Not found user with photo');
    return userList;
}
async function getPhotoByUser(userId){
    const photoList = await photo_userModel.find({userId});
    if(!photoList || photoList.length ===0)
        throw new Error('Not found photo with user');
    return photoList;
}
async function deletePhotoUser(photoId, userId){
    const delItem = await photo_userModel.findOneAndDelete({photoId, userId});
    if(!delItem)
        throw new Error('Cannot delete photo-user')
    return delItem;
}


const phot_userRepo = { create, getPhotoByUser, getUserByPhoto, deletePhotoUser};
export default phot_userRepo;