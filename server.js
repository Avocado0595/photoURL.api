import app from './index.js';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
dotenv.config();
const PORT = process.env.PORT || 5001;
const options = {
    definition: {
        openapi:"4.5.0",
        info:{
            title: "Photo URL API",
            version: "1.0.0",
            description: "Simple api"
        },
        apis:["./src/resources/collection/collection.route.js"]
    }
}
//const specs = swaggerJsDoc(options);
//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.listen(PORT, ()=>console.log(`Server is running at http://localhost:${PORT}/api/`));