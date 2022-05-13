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