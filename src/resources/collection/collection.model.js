import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        collectionName:{
            type: String,
            require: true,
            index: {unique:true},
            unique: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {timestamps: true}
);

const collectionModel = mongoose.model('Collection', schema, 'collection');
export default collectionModel;
