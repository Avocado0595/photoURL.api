import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        collectionName:{
            type: String,
            require: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        isPrivate:{
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

const collectionModel = mongoose.model('Collection', schema, 'collection');
export default collectionModel;
