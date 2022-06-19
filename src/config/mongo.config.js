import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const URI = process.env.NODE_ENV=='test'?process.env.MONGODB_URL_TEST:(process.env.NODE_ENV=='dev'?process.env.MONGODB_URL_DEV:process.env.MONGODB_URL_CLOUD);

async function connectDb() {
	try {
		mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName:'photoURL'
		});
		console.log('Connect database successfully!');
	} catch (error) {
		console.log('Connect database fail! ' + error);
	}
}

export default connectDb;
