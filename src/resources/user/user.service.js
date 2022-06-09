
import UserModel from './user.model.js';
import {TokenHandle, PasswordHandle} from './user.helper.js';
import SessionService from '../session/session.service.js';

export default class UserService{
    constructor(){
        this.sessionService = new SessionService();
        this.tokenHandle = new TokenHandle();
        this.passwordHandle = new PasswordHandle();
    }
    tokenProcess = async(userId, userName)=>{
        const payload = {userId,userName};
        const session = await this.sessionService.createSession(payload);
        const accessToken = this.tokenHandle.createAccessToken(payload);
        console.log(session);
        const refreshToken = this.tokenHandle.createRefreshToken({sessionId: session._id, ...payload});
        return {accessToken, refreshToken};
    }
    createUser = async ({userName, password}) =>{
        const hashedPassword = await this.passwordHandle.hashPassword(password);
        const user = await new UserModel({userName, password: hashedPassword});
        console.log(user);
        if(!user){
            throw new Error('Fail to init new user.');
        }
        const {accessToken, refreshToken} = await this.tokenProcess(user._id, user.userName)
        await user.save();
        return {user:{userName: user.userName, userId: user._id}, accessToken, refreshToken };
    }
    
    login = async ({userName, password}) =>{
        const user = await UserModel.findOne({userName: userName});
        if(!user)
            throw new Error('User not found.');
        const isRightPassword = await this.passwordHandle.comparePassword(password, user.password);
        if(!isRightPassword){
            throw new Error('Password incorrect.');
        }
        const {accessToken, refreshToken} = await this.tokenProcess(user._id, user.userName)
        return {user:{
            userName: user.userName, _id: user._id, 
            displayName: user.displayName, avatarPath: user.avatarPath}, accessToken, refreshToken};
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
        const isRightPassword = await this.passwordHandle.comparePassword(password, user.password);
        if(!isRightPassword){
            throw new Error('Password incorrect.');
        }
        const isDuplicatePassword = await this.passwordHandle.comparePassword(newPassword, user.password);
        if(isDuplicatePassword)
            throw new Error('New password is the same with old password.')
        const hashedPassword = await this.passwordHandle.hashPassword(newPassword);
        const updateUser = await UserModel.findByIdAndUpdate(_id, {password: hashedPassword},  {new: true});
        return updateUser?true:false;
    }
}
