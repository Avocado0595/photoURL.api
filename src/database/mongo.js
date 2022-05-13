import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const URI = process.env.NODE_ENV.trim() == 'test' ?process.env.MONGODB_URL_TEST :process.env.MONGODB_URL;
async function mongoConnect(){
    try{
        mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect database successfully!');
    }
    catch(error){
        console.log('Connect database fail!')
    }
}

export default mongoConnect;