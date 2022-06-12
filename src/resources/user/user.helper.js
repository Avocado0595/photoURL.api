import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export class Validate{
    displayNamePattern = /^(.{6,125}$)/g;
    passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,16}$/g;
    namePattern = /^(?=.{6,125}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
    emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    checkUsername = (userName)=>{
        if(!userName || !userName.match(this.namePattern))
            throw new Error('Invalid user name');
    }
    checkEmail = (email)=>{
        if(!email || !email.match(this.emailPattern))
            throw new Error('Invalid email');
    }
    checkPassword = (password)=>{
        if(!password || !password.match(this.passwordPattern))
            throw new Error('Invalid password');
    }
    
    checkDisplayName = (displayName)=>{
        if(!displayName || !displayName.match(this.displayNamePattern))
            throw new Error('Invalid display name');
    }
}
export class TokenHandle{
    accessSecret = process.env.SECRET_KEY;
    refreshSecret = process.env.SECRET_KEY_REFRESH;
    createAccessToken = (payload)=>{
        return jwt.sign(payload, this.accessSecret , { expiresIn: "5s" });
    }
    
    createRefreshToken = (payload)=>{
        return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
    }
    
    verifyToken = (token, isRefresh)=>{
        try{
            const decoded = jwt.verify(token, isRefresh?this.refreshSecret:this.accessSecret);
            return {payload: decoded, expired: false};
        }
        catch(err){
            return {payload: null, expired: err.message}
        }
    }
}
export class PasswordHandle{
    hashPassword = async(password)=>{
        const saltRounds = parseInt(process.env.SALT) || 9;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password,salt);
        if(!hash)
            throw new Error('Fail to hash password');
        return hash;
    }
    
    comparePassword = async(password, hashPassword)=>{
        return await bcrypt.compare(password, hashPassword);
    }
}