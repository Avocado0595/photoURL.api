import sessionModel from "./session.model.js";

export default class SessionService{
    getSession = async(userId)=>{
        const session = await sessionModel.findOne({userId});
        if(!session)
            return null;

        return {userId: session.userId, userName: session.userName};
    }

    createSession = async(payload)=>{
        const session = await new sessionModel(payload);
        await session.save();
        return session;
    }

}