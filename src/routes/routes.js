import userRouter from '../resources/user/user.route.js';
import collectionRouter from '../resources/collection/collection.route.js';
function route(apiVersion,app){
    app.use(`${apiVersion}/user`, userRouter);
    app.use(`${apiVersion}/collection`, collectionRouter);
}

export default route;