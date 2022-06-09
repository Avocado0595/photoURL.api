import userRouter from '../resources/user/user.route.js';
import collectionRouter from '../resources/collection/collection.route.js';
import photoRouter from '../resources/photo/photo.route.js';
import { deserializeUser } from '../resources/user/user.middleware.js';
function route(rootUrl,app){
    app.use(`${rootUrl}/users`,deserializeUser, userRouter);
    app.use(`${rootUrl}/collections`, collectionRouter);
    app.use(`${rootUrl}/photos`, photoRouter);
}

export default route;//localhost:8080/user