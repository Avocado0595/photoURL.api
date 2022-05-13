import userRepo from './user.repo.js';

async function createUser(params) {
    return await userRepo.createUser(params);
}
async function login(userName, password) {
    return await userRepo.login(userName, password);
}
async function updateUser(_id, params){
    return await userRepo.updateUser(_id, params);
}
async function updatePassword(_id, password, newPassword){
    return await userRepo.updatePassword(_id, password, newPassword);
}
async function getUserById(_id){
    return await userRepo.getUserById(_id);
}
const userService = {createUser, login, updateUser, updatePassword, getUserById}
export default userService;
