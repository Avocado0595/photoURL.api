import multer from "multer";
import createResponse from "../utils/response.ulti.js";
function requireUpload(req, res, next) {
    try{
        const upload = multer({
            limits: {
              fileSize: 4 * 1024 * 1024,
            }
        }).single('avatar');
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError || err) {
            return res.status(400).json(createResponse(false,err.message, null))
        }
            next();
        })
    }
    catch(err){
        return res.status(400).json(createResponse(false,err.message, null))
    }
    
  }
export default requireUpload;