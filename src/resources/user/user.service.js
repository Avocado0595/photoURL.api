
import UserModel from './user.model.js';
import { createToken, comparePassword, hashPassword } from './user.helper.js';
import SessionService from '../session/session.service.js';

export default class UserService{
    sessionService = new SessionService();
    createUser = async ({userName, password}) =>{
        const hashedPassword = await hashPassword(password);
        const user = await new UserModel({userName, password: hashedPassword});
        if(!user){
            throw new Error('Fail to init new user.');
        }
        const payload = {userId: user._id,userName: user.userName};
        const token = createToken(payload);
        await this.sessionService.createSession(payload);
        await user.save();
        return {user:{userName: user.userName, userId: user._id}, ...token };
    }
    
    login = async (userName, password) =>{
        const user = await UserModel.findOne({userName: userName});
        if(!user)
            throw new Error('User not found.');
        const isRightPassword = await comparePassword(password, user.password);
        if(!isRightPassword){
            throw new Error('Password incorrect.');
        }
        const payload = {userId: user._id,userName: user.userName};
        const token = createToken(payload);
        await this.sessionService.createSession(payload);
        return {user:{
            userName: user.userName, _id: user._id, 
            displayName: user.displayName, avatarPath: user.avatarPath}, ...token};
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
