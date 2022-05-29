import express from 'express';
import router from './src/routes/routes.js';
import connectDb from './src/config/mongo.config.js';
import { initMiddleware } from './src/middlewares/app.middleware.js';

const app = express();

initMiddleware(app);
connectDb();
app.get('/',(req,res)=>res.send('hello'));
const rootUrl = '/api';
router(rootUrl,app);
export default app;


