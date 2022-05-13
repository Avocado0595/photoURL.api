
import { checkUsername, createToken, checkPassword, hashPassword, checkDisplayName } from './user.helper.js';
import userService from './user.service.js';
import createResponse from '../../utils/response.ulti.js';
async function createUser(req, res){    
    try{
        const {userName, password} = req.body;
        checkUsername(userName);
        checkPassword(password);
        const hashPass = await hashPassword(password);
        const user = await userService.createUser({userName, password: hashPass});
        const token = createToken(user._id,user.userName)
        res.status(201).json(createResponse(true,"Create new user successfully.",{user,token}));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message,null));
    }
}

async function login(req, res){    
    
    try{
        const {userName, password} = req.body;
        checkUsername(userName);
        checkPassword(password);
        const user = await userService.login(userName, password);
        const token = createToken(user._id, user.userName)
        res.status(200).json(createResponse(true,"Login successfully.",{user,token}));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message,null));
    }
}
async function updateUser(req, res){
    try{
        const updateData = {...JSON.parse(JSON.stringify({displayName: req.body.displayName,avatarPath: req.body.avatarPath }))};
        if(updateData.hasOwnProperty('displayName')){
            checkDisplayName(updateData.displayName);
        }
        const paramsUserId = req.params._id;
        const user = {_id: req._id, userName: req.userName};

        if(paramsUserId !== user._id)
            throw new Error('Invalid token.');
        const updateUser = await userService.updateUser(user._id, updateData);
        return res.status(200).json(createResponse(true,"Update user successfully.",{user: updateUser}));
    }
    catch(err){
        return res.status(400).json(createResponse(false,err.message,null))
    }
}
async function updatePassword(req, res){
    try{
        const newPassword = req.body.newPassword;
        const oldPassword = req.body.oldPassword;
        checkPassword(newPassword);
        checkPassword(oldPassword);
        const paramsUserId = req.params._id;
        const userId =  req._id;
        if(paramsUserId !== userId)
            throw new Error('Invalid token.');
        const hashNewPass = await hashPassword(newPassword);
        const updateResult = await userService.updatePassword(userId,oldPassword, hashNewPass)
        res.status(200).json(createResponse(true, 'Update password successfully', updateResult));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message, null))
    }
}

async function getUserById(req, res){
    try{
        const userId = req.params._id;
        if(!userId)
            throw new Error('Invalid id.');
        const user = await userService.getUserById(userId);
        res.status(200).json(createResponse(true, 'Get user successfully', {user}));
    }
    catch(err){
        res.status(400).json(createResponse(false,err.message, null))
    }
    
}
const userController = {createUser, login, updateUser,updatePassword, getUserById};
export default userController;