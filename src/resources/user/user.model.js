import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        userName:{
            type: String,
            require: true,
            maxlength: 125,
            minlength: 6,
            index: {unique:true},
            unique: true
        },
        displayName:{
            type: String,
            maxlength: 255,
            minlength: 6
        },
        password:{
            type: String,
            required: true,
            minlength:6
        },
        avatarPath:{
            type: String,
            minlength:3
        },
        email:{
            type: String,
            maxlength: 3
        }
        
    },
    {timestamps: true}
);

const userModel = mongoose.model('User', schema, 'user');
export default userModel;
