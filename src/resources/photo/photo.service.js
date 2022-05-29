import photoModel from "./photo.model.js";
import userModel from "../user/user.model.js";
export default class PhotoService{
    /**
     * 
     * @param {url,name,collectionid,authorid,likelist, watchlist} params 
     * @returns 
     */
    
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
    getPhotoList = async(userName)=>{
        const user = await userModel.findOne({userName});
        if(!user)
            throw Error('User not found');
        const photoList = await photoModel.find({userName});
        if(!photoList)
            throw new Error(`Fail to find photo list of : ${userName}`);
        return photoList;
    }
    
    getUserPhotoById = async({userName, _id})=>{
        const photo = await photoModel.findOne({_id, userName});
        if(!photo)
            throw new Error(`Fail to find photo id : ${_id}`);
        return photo;
    }
    getPhoto = async({page, limit, offset, search})=>{
        if(search){
            console.log({page, limit, offset, search})
            return await photoModel.find({$text: {$search: search}}).limit(limit).skip((page-1)*offset);
        }
        else{
            console.log({page, limit, offset, search})
            return await photoModel.find().limit(limit).skip((page-1)*offset);
        }
    }
}