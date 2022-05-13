import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        photoId:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            minlength: 6,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            minlength:6,
        },
    },
    {timestamps: true}
);

const photo_userModel = mongoose.model('Photo_User', schema, 'photo_user');
export default photo_userModel;
