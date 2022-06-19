import photoModel from "./photo.model.js";
import collectionModel from "../collection/collection.model.js";
import CollectionService from "../collection/collection.service.js";
export default class PhotoService{
    collectionService = new CollectionService();

    getPhotoListByUser = async(userId, authId)=>{
        const rawPhotoList = await photoModel.find({userId})
                            .populate({path: 'collectionId',select: "_id collectionName"})
                            .populate({path:'userId', select:"_id userName"});
        if(!rawPhotoList)
            throw new Error(`Fail to find photos of user id: ${userId}`);
        const photoList = rawPhotoList.filter(p=>{
            if(!p.isPrivate) return true;
            if(p.userId._id.toString()===authId) return true;
            return false;
        })
        return photoList;
    }

    getPhotoListByCollection = async(collectionId, userId, {page, limit, skip})=>{
        await this.collectionService.getCollectionById(collectionId, userId);
        const photoList = await photoModel.find({collectionId})
                            .populate({path: 'collectionId',select: "_id collectionName"})
                            .populate({path:'userId', select:"_id userName"})
                            .limit(limit).skip((page-1)*skip);
        if(!photoList)
            throw new Error(`Fail to find photos of collection id: ${collectionId}`);
        return photoList;
    }

    getPhotoById = async(_id, userId)=>{
        const photo = await photoModel.findById(_id)
                    .populate({path: 'collectionId',select: "_id collectionName"})
                    .populate({path:'userId', select:"_id userName"})
        if(!photo)
            throw new Error(`Fail to find photo id : ${_id}.`);
        if(!photo.isPrivate)
            return photo;
        if(photo.userId._id.toString() !== userId){
            throw new Error('Invalid access.');
        }
        return photo;
    }

    getPhotoList = async(userId,{page, limit, skip, search})=>{
        const searchParams = search&&{$text: {$search: search}};
        const rawPhotoList = await photoModel.find({...searchParams})
                    .populate({path: 'collectionId',select: "_id collectionName"})
                    .sort({likeCount:1})
                    .populate({path:'userId', select:"_id userName"})
                    .limit(limit).skip((page-1)*skip);
        const photoList = rawPhotoList.filter(p=>{
            if(!p.isPrivate)
                return true;
            if(p.userId._id.toString() === userId)
                return true;
            return false;
        });
        return photoList;
    }

    createPhoto = async ({photoUrl, photoName,collectionId,userId, isPrivate})=>{
        const collection = await collectionModel.findOne({_id:collectionId,userId});
        const newphoto = await new photoModel({photoUrl, photoName,collectionId,userId, isPrivate: (collection&&collection.isPrivate)?true:isPrivate});
        if(!newphoto){
            throw new Error('Fail to add new photo.');
        }
        await newphoto.save();
        return newphoto;
    }

    updatePhoto = async (_id, userId,params)=>{
        const photo = await photoModel.findOneAndUpdate({_id, userId}, params, {new: true});
        if(!photo)
            throw new Error(`Fail to update photo id: ${_id}`);
        return photo;
    }

    deletePhoto = async (_id, userId)=>{
        const photo = await photoModel.findByIdAndDelete({_id, userId});
        if(!photo)
            throw new Error(`Fail to delete photo id: ${_id}`);
        return photo;
    }

    like = async(userId, photoId)=>{
        const liked = await photoModel.findOne({_id: photoId,likes : userId});
        if(liked.isPrivate && liked.userId !== userId)
            throw new Error('Invalid access.');
        if(liked){
            await photoModel.findByIdAndUpdate(photoId, {$pull: {"likes":user._id}, $inc:{likeCount:-1}},{new: true, upsert: true})
            return {liked: false};
        }
        await photoModel.findByIdAndUpdate(photoId, {$push: {"likes":user._id},$inc:{likeCount:+1}},{new: true, upsert: true})
        return {liked: true};
    }
}