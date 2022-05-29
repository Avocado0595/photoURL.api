import userRouter from '../resources/user/user.route.js';
import collectionRouter from '../resources/collection/collection.route.js';
import photoRouter from '../resources/photo/photo.route.js';
function route(rootUrl,app){
    app.use(`${rootUrl}/user`, userRouter);
    app.use(`${rootUrl}/collection`, collectionRouter);
    app.use(`${rootUrl}/photo`, photoRouter);
}

export default route;//localhost:8080/user