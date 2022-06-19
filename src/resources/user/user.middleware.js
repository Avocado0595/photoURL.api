
import SessionService from '../session/session.service.js';
import { TokenHandle} from './user.helper.js';
import createResponse from '../../utils/response.ulti.js';
async function deserializeUser(req, res, next){
    const tokenHandle = new TokenHandle();
    const {accessToken, refreshToken} = req.cookies;
    const {payload, expired} = tokenHandle.verifyToken(accessToken, false);
    
    if(payload){
        req.user = payload;
        return next();
    }
    
    const refresh = (expired&&refreshToken)? tokenHandle.verifyToken(refreshToken, true):null;
    if(!refresh)
        return next();

    const sessionService = new SessionService();
    const session = await sessionService.getSession(refresh.payload.sessionId);
    if (!session) {
        return next();
    }

    const newAccessToken = tokenHandle.createAccessToken(session);
    res.cookie("accessToken", newAccessToken,{
        maxAge: 300000,
        httpOnly: true,
        sameSite:"strict"
    });
    req.user = tokenHandle.verifyToken(newAccessToken,false).payload;
    return next();
}
async function requireUser(req, res, next){
    if(!req.user)
        return res.status(403).json(createResponse(false,'Unauthorize access.',null));
    next();
}
export {deserializeUser, requireUser};