import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        userName:{
            type: String,
            require: true,
            minlength: 3,
            maxlength: 125,
            index: {unique:true},
            unique: true
        },
        password:{
            type: String,
            minlength:8,
            required: true,
            maxlength: 125,
        },
        email:{
            type:String,
            minlength: 6,
            maxlength: 125,
            require: true
        },
        displayName: {
            type: String,
            minlength: 6,
            maxlength: 125,
        },
        avatarPath:{
            type: String,
            minlength: 6,
            maxlength: 250,
        }
    },
    {timestamps: true}
);


const userModel = mongoose.model('User', schema, 'user');
export default userModel;
