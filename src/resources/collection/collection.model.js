import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        collectionName:{
            type: String,
            require: true,
            index: {unique:true},
            unique: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            minlength:3,
            required: true
        }
    },
    {timestamps: true}
);

const collectionModel = mongoose.model('Collection', schema, 'collection');
export default collectionModel;
