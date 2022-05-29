import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        userName:{
            type: String,
            require: true,
            index: {unique:true},
            unique: true
        },
        password:{
            type: String,
            minlength:8,
            required: true
        },
        displayName: {
            type: String,
            minlength: 6
        },
        avatarPath:{
            type: String,
            minlength: 6,
        },
        email:{
            type:String,
            minlength: 6,
        }

    },
    {timestamps: true}
);


const userModel = mongoose.model('User', schema, 'user');
export default userModel;
