
import UserModel from './user.model.js';
import { comparePassword, hashPassword } from './user.helper.js';

export default class UserService{

    createUser = async ({userName, password}) =>{
        const hashedPassword = await hashPassword(password);
        const user = await new UserModel({userName, password: hashedPassword});
        if(!user){
            throw new Error('Fail to init new user.');
        }
        await user.save();
        return {userName: user.userName, _id: user._id};
    }
    
    login = async (userName, password) =>{
        const user = await UserModel.findOne({userName: userName});
        if(!user)
            throw new Error('User not found.');
        const isRightPassword = await comparePassword(password, user.password);
        if(!isRightPassword){
            throw new Error('Password incorrect.');
        }
        return {userName: user.userName, _id: user._id, displayName: user.displayName};
    }
    
    getMyAccount = async (_id)=>{
        const user = await UserModel.findById(_id);
        if(!user)
            throw new Error('User not found.');
        return {_id,userName: user.userName, displayName: user.displayName, avatarPath: user.avatarPath, email: user.email};
    }
    getUserByUserName = async (userName)=>{
        const user = await UserModel.findOne({userName});
        if(!user)
            throw new Error('User not found.');
        return {_id:user._id,userName: user.userName, displayName: user.displayName, avatarPath: user.avatarPath, email: user.email};
    }
    updateUser = async (_id, params)=>{
        const updateUser = await UserModel.findByIdAndUpdate(_id, params, {new: true});
        if(!updateUser)
            throw new Error('User not found.');
        return {userName: updateUser.userName, _id: updateUser._id, displayName: updateUser.displayName};
    }
    
    updatePassword = async (_id,password, newPassword)=>{
        const user = await UserModel.findById(_id);
        const isRightPassword = await comparePassword(password, user.password);
        if(!isRightPassword){
            throw new Error('Password incorrect.');
        }
        const updateUser = await UserModel.findByIdAndUpdate(_id, {password: newPassword},  {new: true});
        return updateUser?true:false;
    }
}
