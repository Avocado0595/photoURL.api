GET /api/collection/
=> list collection:
[
    {
        collectionId: 123
        collectionName: "abc"
        photoList: [photoId1, photoId2, photoId3]
    },
    {
        collectionId: 111
        collectionName: "abc12"
        photoList: [photoId01, photoId02, photoId3]
    }
]

GET /api/collection/{id} 
=> collectionId: 123
   collectionName: "abc"
   photoList: [photoId1, photoId2, photoId3]

/api/profile

 **testing with jest
 1. install : npm i -D jest supertest

/api/photo
POST  '/'                           verifyToken photoController.create

GET  '/me'                          photoController.getMyPhotoList
GET  '/user/:userName/'             photoController.getUserPhotoList

GET  '/me/:_id'                     photoController.getMyPhotoById
GET  '/user/:userName/:photoId'     photoController.getUserPhotoById

/api/user

POST    '/auth/signup',             userController.createUser
POST    '/auth/login',              userController.login
GET     '/auth/me',                 verifyToken, userController.getMyAccount
PUT     '/auth/update',             verifyToken, userController.updateUser
PATCH   '/auth/change_password',    verifyToken, userController.updatePassword

GET     '/:userName',               verifyToken,userController.getUserByUserName

/api/collection
POST    '/',                verifyToken,collectionController.create
PUT     '/:_id',            verifyToken,collectionController.updateCollection
GET     '/:_id',            collectionController.getCollectionById
GET     '/user/:userId',    collectionController.getCollectionListByUser


*send token:
res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3000
});
res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 1month
});

logout:
res.cookie('token', '', {
    httpOnly: true,
    maxAge: 0
});
res.cookie('refreshToken', '', {
    httpOnly: true,
    maxAge: 0
});

verifyToken:

const {payload, expired} = verify(token);
consr refresh = expired&& refreshToken ? verify(refreshToken) : null;

if(!refresh){
    next()
}
const session = getSession(refresh.sessionId)
******
getSession(sessionId){
    const session = sessions[sessionId];
    return session && session.valid ? session : null
}
******


const new Acc
