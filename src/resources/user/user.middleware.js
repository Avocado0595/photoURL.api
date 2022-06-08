
import SessionService from '../session/session.service.js';
import { verifyToken, signToken} from './user.helper.js';
async function deserializeUser(req, res, next){
    const {accessToken, refreshToken} = req.cookies;
    const {payload, expired} = verifyToken(accessToken, false);
    
    if(payload){
        req.user = payload;
        return next();
    }
    
    const refresh = (expired&&refreshToken)? verifyToken(refreshToken, true):null;
    if(!refresh)
        return next();

    const sessionService = new SessionService();
    const session = await sessionService.getSession(refresh.payload.userId);
    if (!session) {
        return next();
    }

    const newAccessToken = signToken(session,"5s");
    res.cookie("accessToken", newAccessToken,{
        maxAge: 300000,
        httpOnly: true,
        sameSite:"strict"
    });
    req.user = verifyToken(newAccessToken,false).payload;
    return next();
}

export {deserializeUser};