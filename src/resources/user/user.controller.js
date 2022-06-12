
import { Validate } from './user.helper.js';
import createResponse from '../../utils/response.ulti.js';
import UserService from './user.service.js';
export default class UserController{
    constructor(){
        this.userService = new UserService();
        this.validate = new Validate();
    }
    setCookie = (res,accessToken,refreshToken)=>{
        res.cookie("accessToken",accessToken, {httpOnly: true, sameSite: 'strict', maxAge: 300000});
        res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: 'strict', maxAge: 24*60*7*10000});
    }
    createUser = async(req, res)=>{   
        try{
            const {userName, password, email} = req.body;
            this.validate.checkUsername(userName);
            this.validate.checkPassword(password);
            this.validate.checkEmail(email);
            const {user, accessToken, refreshToken}  = await this.userService.createUser({userName, password, email});
            this.setCookie(res, accessToken, refreshToken);
            res.status(201).json(createResponse(true,"Create new user successfully.",{user}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }

    login = async (req, res)=> {        
        try{
            const {userName, password} = req.body;
            this.validate.checkUsername(userName);
            this.validate.checkPassword(password);
            const {user, accessToken, refreshToken}  = await this.userService.login({userName, password});
            this.setCookie(res, accessToken, refreshToken);
            res.status(200).json(createResponse(true,"Login successfully.",{user}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message,null));
        }
    }
    signout = async(req, res)=>{
        try{
            const userId =  req.user.userId;
            if(!userId)
                throw new Error('Invalid token.');
            const result = await this.userService.signout(userId);
            return res.status(200).json(createResponse(true,"Signout successfully.",{result}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null))
        }
        
    }
    updateUser = async (req, res)=>{
        try{
            const updateData = {...JSON.parse(JSON.stringify({displayName: req.body.displayName,avatarPath: req.body.avatarPath }))};
            if(updateData.hasOwnProperty('displayName')){
                this.validate.checkDisplayName(updateData.displayName);
            }
            const userId =  req.user.userId;
            if(!userId)
                throw new Error('Invalid token.');
            const updateUser = await this.userService.updateUser(userId, updateData);
            return res.status(200).json(createResponse(true,"Update user successfully.",{user: updateUser}));
        }
        catch(err){
            return res.status(400).json(createResponse(false,err.message,null))
        }
    }
    updatePassword = async (req, res)=>{
        try{
            const newPassword = req.body.newPassword;
            const oldPassword = req.body.oldPassword;
            this.validate.checkPassword(newPassword);
            this.validate.checkPassword(oldPassword);
            const userId =  req.user.userId;
            if(!userId)
                throw new Error('Invalid token.');
            const updateResult = await this.userService.updatePassword(userId,oldPassword, newPassword)
            res.status(200).json(createResponse(true, 'Update password successfully', updateResult));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message, null))
        }
    }
    
    getMyAccount = async (req, res)=>{
        try{
            const sessionUser = req.user;
            if(!sessionUser)
                throw new Error('Invalid token.');
            const user = await this.userService.getMyAccount(sessionUser.userId);
            res.status(200).json(createResponse(true, 'Get user successfully', {user}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message, null))
        }
        
    }
    getUserByUserName = async(req, res)=>{
        try{
            const userName = req.params.userName;
            if(!userName)
                throw new Error('Invalid userName.');
            const user = await this.userService.getUserByUserName(userName);
            res.status(200).json(createResponse(true, 'Get user successfully', {user}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message, null))
        }
    }
    getNewPassword = async(req, res)=>{
        try{
            const {userName, email} = req.body;
            if(!userName || !email)
                throw new Error('Invalid userName or email.');
            const result = await this.userService.getNewPassword({userName, email});
            res.status(200).json(createResponse(true, 'Get new password successfully', {result}));
        }
        catch(err){
            res.status(400).json(createResponse(false,err.message, null))
        }
    }
}


