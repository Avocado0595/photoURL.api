import express from 'express';
import router from './src/routes/routes.js';
import mongoConnect from './src/database/mongo.js';
import { initMiddleware } from './src/middlewares/app.middleware.js';

const app = express();
initMiddleware(app);
mongoConnect();
app.get('/',(req,res)=>res.send('hello'))
const apiVersion = '/api';
router(apiVersion,app);
export default app;
//app.listen(PORT, ()=>console.log(`Server is running at http://localhost:${PORT}`));

