
import { Validate } from './user.helper.js';
import createResponse from '../../utils/response.ulti.js';
import UserService from './user.service.js';
import path from 'path';
import Resize from '../../utils/resize-image.js'; 
export default class UserController{
    constructor(){
        this.userService = new UserService();
        this.validate = new Validate();
    }
    setCookie = (res,accessToken,refreshToken)=>{
        res.cookie("accessToken",accessToken, {httpOnly: true, sameSite: 'strict', maxAge: 300000});
        res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: 'strict', maxAge: 24*60*7*1000});
    }
    //POST /users/signup
    createUser = async(req, res)=>{   
        try{
            const {userName, password, email} = req.body;
            this.validate.checkUsername(userName);
            this.validate.checkPassword(password);
            this.validate.checkEmail(email);
            const {user, accessToken, refreshToken}  = await this.userService.createUser({userName, password, email});
            this.setCookie(res, accessToken, refreshToken);
            return res.status(201).json(createResponse(true,"Create new user successfully.",{user}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //DELETE /users/signout
    signout = async(req, res)=>{
        try{
            const userId =  req.user.userId;
            if(!userId)
                throw new Error('Invalid token.');
            const result = await this.userService.signout(userId);
            this.setCookie(res, '', '');
            return res.status(200).json(createResponse(true,"Signout successfully.",{result}));
        }
        catch(err){
            return res.status(401).json(createResponse(false,err.message,null))
        }
        
    }
    //POST /users/login
    login = async (req, res)=> {        
        try{
            const {userName, password} = req.body;
            this.validate.checkUsername(userName);
            this.validate.checkPassword(password);
            const {user, accessToken, refreshToken}  = await this.userService.login({userName, password});
            this.setCookie(res, accessToken, refreshToken);
            return res.status(201).json(createResponse(true,"Login successfully.",{user}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null));
        }
    }
    //PUT /users/update
    updateUser = async (req, res)=>{
        try{
            const userId =  req.user.userId;
            const updateData = {...JSON.parse(JSON.stringify({displayName: req.body.displayName,avatarPath: req.body.avatarPath }))};
            if(updateData.hasOwnProperty('displayName')){
                this.validate.checkDisplayName(updateData.displayName);
            }
            const updateUser = await this.userService.updateUser(userId, updateData);
            return res.status(201).json(createResponse(true,"Update user successfully.",{user: updateUser}));
        }
        catch(err){
            return res.status(401).json(createResponse(false,err.message,null))
        }
    }
    //PATCH /users/change-password
    updatePassword = async (req, res)=>{
        try{
            const userId =  req.user.userId;
            const {newPassword,oldPassword} = req.body;
            this.validate.checkPassword(newPassword);
            this.validate.checkPassword(oldPassword);
            const updateResult = await this.userService.updatePassword(userId,oldPassword, newPassword)
            return res.status(200).json(createResponse(true, 'Update password successfully', updateResult));
        }
        catch(err){
            return res.status(401).json(createResponse(false,err.message, null))
        }
    }
    //GET /users/new-pasword
    getNewPassword = async(req, res)=>{
        try{
            const {userName, email} = req.body;
            this.validate.checkUsername(userName);
            this.validate.checkEmail(email);
            const result = await this.userService.getNewPassword({userName, email});
            return res.status(201).json(createResponse(true, 'Get new password successfully', {result}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message, null))
        }
    }
    //GET /users/profile/:_id
    getUser = async(req, res)=>{
        try{
            if(!req.user)
                throw new Error('Invalid session');
            const _id = req.params.userId;
            if(!_id)
                throw new Error('Invalid _id.');
            const user = await this.userService.getUser(_id);

            return res.status(200).json(createResponse(true, 'Get user successfully', {user}));
        }
        catch(err){
            return res.status(401).json(createResponse(false,err.message, null))
        }
    }

    //UPDATE /users/update-avatar
    updateAvatar = async(req, res)=>{
        try{
            if(!req.user)
                throw new Error('Invalid session');
            const userId = req.user.userId;
            const imagePath = path.join(path.resolve(), '/public/avatars');
            const fileUpload = new Resize(imagePath);
            if (!req.file) {
                res.status(400).json(createResponse(false,'Please provide an image.', null));
            }
            const avatarPath = await fileUpload.save(req.file.buffer);
            await this.userService.updateAvatar(userId,avatarPath)
            return res.status(201).json({avatarPath });
        }
        catch(err){
            return res.status(401).json(createResponse(false,err.message, null))
        }
        
    }
}


