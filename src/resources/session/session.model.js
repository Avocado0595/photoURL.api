import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"User"
        },
        userName:{
            type: String,
            require: true,
        },
        createdAt: {type: Date, expires: 7*24*60*60, default: Date.now}
    }
);

const sessionModel = mongoose.model('Session', schema, 'session');
export default sessionModel;
