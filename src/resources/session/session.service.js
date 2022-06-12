import sessionModel from "./session.model.js";

export default class SessionService{
    getSession = async(_id)=>{
        const session = await sessionModel.findById(_id);
        if(!session)
            return null;

        return {userId: session.userId, userName: session.userName};
    }

    createSession = async(payload)=>{
        const existSession = await this.getSession(payload.sessionId);
        if(existSession != null)
            return existSession;
        const session = await new sessionModel(payload);
        await session.save();
        return session;
    }

    deleteSession =async(userId)=>{
        return await sessionModel.findOneAndDelete({userId});
    }

}