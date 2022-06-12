import photoModel from "./photo.model.js";
import userModel from "../user/user.model.js";
import collectionModel from "../collection/collection.model.js";
export default class PhotoService{
    createPhoto = async (params)=>{
        const newphoto = await new photoModel(params);
        if(!newphoto){
            throw new Error('Fail to add new photo.');
        }
        await newphoto.save();
        return newphoto;
    }
    
    getPhotoId = async (_id)=>{
        const photo = await photoModel.findOne({_id})
        if(!photo)
            throw new Error(`Fail to get photo id: ${_id}`);
        return photo;
    }
    
    updatePhoto = async (_id,params)=>{
        const photo = await photoModel.findByIdAndUpdate(_id, params, {new: true});
        if(!photo)
            throw new Error(`Fail to update photo id: ${_id}`);
        return photo;
    }
    
    deletePhoto = async (_id)=>{
        const photo = await photoModel.findByIdAndDelete(_id);
        if(!photo)
            throw new Error(`Fail to delete photo id: ${_id}`);
        return photo;
    }
    getUserPhotoList = async(userId)=>{
        const user = await userModel.findById(userId);
        if(!user)
            throw Error(`User ${userId} not found`);
        const photoList = await photoModel.find({userId})
                            .populate({path: 'collectionId',select: "_id collectionName"})
        if(!photoList)
            throw new Error(`Fail to find photos of user id: ${userId}`);
        return photoList;
    }
    getCollectionPhotoList = async(collectionId)=>{
        const collection = await collectionModel.findById(collectionId);
        if(!collection)
            throw Error(`User ${collectionId} not found`);
        const photoList = await photoModel.find({collectionId})
                            .populate({path:'userId', select:"_id userName"});;
        if(!photoList)
            throw new Error(`Fail to find photos of collection id: ${collectionId}`);
        return photoList;
    }
    getPhotoById = async(_id)=>{
        const photo = await photoModel.findById(_id)
                    .populate({path: 'collectionId',select: "_id collectionName"})
                    .populate({path:'userId', select:"_id userName"});
        if(!photo)
            throw new Error(`Fail to find photo id : ${_id}`);
        return photo;
    }
    getPhotoList = async({page, limit, skip, search})=>{
        if(search){
            return await photoModel.find({$text: {$search: search}})
                    .populate({path: 'collectionId',select: "_id collectionName"})
                    .populate({path:'userId', select:"_id userName"})
                    .limit(limit).skip((page-1)*skip);
        }
        else{
            return await photoModel.find()
                    .populate({path: 'collectionId',select: "_id collectionName"})
                    .populate({path:'userId', select:"_id userName"})
                    .limit(limit).skip((page-1)*skip);
        }
    }
    like = async(userId, photoId)=>{
        const user = await userModel.findById(userId);
        if(!user)
            throw new Error('User not found.')
        const liked = await photoModel.findOne({_id: photoId,likes : user._id})
        if(liked){
            await photoModel.findByIdAndUpdate(photoId, {$pull: {"likes":user._id}, $inc:{likeCount:-1}},{new: true, upsert: true})
            return {liked: false};
        }
        await photoModel.findByIdAndUpdate(photoId, {$push: {"likes":user._id},$inc:{likeCount:+1}},{new: true, upsert: true})
        return {liked: true};
    }
}