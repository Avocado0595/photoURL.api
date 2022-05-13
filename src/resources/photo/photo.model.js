import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        photoUrl:{
            type: String,
            require: true,
            minlength: 6,
        },
        photoName:{
            type: String,
            maxlength: 255,
            minlength: 6,
            index: {unique:true}
        },
        collectionId:{
            type: mongoose.Schema.Types.ObjectId,
            default: 'unclassify',
            minlength:6
        },
        authorId:{
            type: [mongoose.Schema.Types.ObjectId],
            minlength:3,
            required: true
        },
        likeList:{
            type: [mongoose.Schema.Types.ObjectId],
            default:[]
        }
    },
    {timestamps: true}
);

const photoModel = mongoose.model('Photo', schema, 'photo');
export default photoModel;
