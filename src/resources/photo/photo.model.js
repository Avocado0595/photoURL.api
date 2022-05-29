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
            required: true,
            maxlength: 255,
            minlength: 6,
            index: true
        },
        userName:{
            type: String,
            required: true,
            minlength:8,
        },
        isPrivate:{
            type:Boolean,
            default: false,
        },
        likes:{
            type: [mongoose.Schema.Types.ObjectId],
            default:[],
        },
        views:{
            type: Number,
            min:0,
            default:0
        },
        collectionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        }
        
    },
    {timestamps: true}
);

schema.index({photoName: 'text'});
const photoModel = mongoose.model('Photo', schema, 'photo');
export default photoModel;
