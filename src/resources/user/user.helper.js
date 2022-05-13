import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const displayNamePattern = /^(.{6,125}$)/g;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,16}$/g;
const namePattern = /^(?=.{6,125}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
function checkUsername(userName){
    if(!userName || !userName.match(namePattern))
        throw new Error('Invalid user name');
}

function checkPassword(password){
    if(!password || !password.match(passwordPattern))
        throw new Error('Invalid password');
}

function checkDisplayName(displayName){
    if(!displayName || !displayName.match(displayNamePattern))
        throw new Error('Invalid display name');
}
function createToken(_id, userName){
    return jwt.sign({_id, userName}, process.env.SECRET_KEY, { expiresIn: "24h" });
}

const saltRounds = parseInt(process.env.SALT) || 9;
async function hashPassword(password){
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password,salt);
    if(!hash)
        throw new Error('Fail to hash password');
    return hash;
}

async function comparePassword(password, hashPassword){
    return await bcrypt.compare(password, hashPassword);
}

export {checkUsername, checkPassword, checkDisplayName, createToken,hashPassword, comparePassword};