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
function createToken(payload){
    const accessToken= jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5s" });
    const refreshToken= jwt.sign(payload, process.env.SECRET_KEY_REFRESH, { expiresIn: "7d" });
    return {accessToken, refreshToken};
}

function signToken(payload,expiresIn ){
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn});
    return token;
}

function verifyToken(token, isRefresh){
    try{
        const decoded = jwt.verify(token, isRefresh?process.env.SECRET_KEY_REFRESH:process.env.SECRET_KEY);
        return {payload: decoded, expired: false};
    }
    catch(err){
        return {payload: null, expired: err.message}
    }
}

async function hashPassword(password){
    const saltRounds = parseInt(process.env.SALT) || 9;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password,salt);
    if(!hash)
        throw new Error('Fail to hash password');
    return hash;
}

async function comparePassword(password, hashPassword){
    return await bcrypt.compare(password, hashPassword);
}

export {signToken, checkUsername, checkPassword, checkDisplayName, createToken,verifyToken,hashPassword, comparePassword};