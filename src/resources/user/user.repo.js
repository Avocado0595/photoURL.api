import userModel from './user.model.js';
import { comparePassword } from './user.helper.js';

async function createUser(params) {
    const user = await new userModel(params);
    if(!user){
        throw new Error('Fail to init new user.');
    }
    await user.save();
    return user
}

async function login(userName, password) {
    const user = await userModel.findOne({userName: userName});
    if(!user)
        throw new Error('User not found.');
    const isRightPassword = await comparePassword(password, user.password);
    if(!isRightPassword){
        throw new Error('Password incorrect.');
    }
    return {userName: user.userName, _id: user._id, displayName: user.displayName};
}

async function getUserById(_id){
    const user = await userModel.findById(_id);
    if(!user)
        throw new Error('User not found.');
    return {userName: user.userName, displayName: user.displayName, avatarPath: user.avatarPath, email: user.email};
}
async function updateUser(_id, params){
    const updateUser = await userModel.findByIdAndUpdate(_id, params, {new: true});
    if(!updateUser)
        throw new Error('User not found.');
    return {userName: updateUser.userName, _id: updateUser._id, displayName: updateUser.displayName};
}

async function updatePassword(_id,password, newPassword){
    const user = await userModel.findById(_id);
    const isRightPassword = await comparePassword(password, user.password);
    if(!isRightPassword){
        throw new Error('Password incorrect.');
    }
    const updateUser = await userModel.findByIdAndUpdate(_id, {password: newPassword},  {new: true});
    return updateUser?true:false;
}

const userRepo = { createUser, login,updateUser, updatePassword, getUserById };
export default userRepo;