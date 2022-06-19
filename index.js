import express from 'express';
import router from './src/routes/routes.js';
import connectDb from './src/config/mongo.config.js';
import { initMiddleware } from './src/middlewares/app.middleware.js';
import path from 'path';
const app = express();

initMiddleware(app);
connectDb();
console.log(path.resolve());
app.get('/',(req,res)=>res.sendFile(path.join(path.resolve()+'/index.html')));
const rootUrl = '/api';
router(rootUrl,app);
export default app;


