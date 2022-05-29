import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const URI = process.env.MONGODB_URL;
async function connectDb() {
	try {
		mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connect database successfully!');
	} catch (error) {
		console.log('Connect database fail! ' + error);
	}
}

export default connectDb;
