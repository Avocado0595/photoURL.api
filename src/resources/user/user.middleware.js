import jwt from 'jsonwebtoken';
import createResponse from '../../utils/response.ulti.js';

function verifyToken(req, res, next){
    const token = req.headers['authorization'];
    if (token) {
        req.token = token;
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json(createResponse(false,err.message,null));
            }
            else {
                req._id = decoded._id;
                req.userName = decoded.userName;
                next();
            }
        });
    }
    else {
        res.status(401).json(createResponse(false, 'Token not found.', null));
    }
}

export {verifyToken};