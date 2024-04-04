import { Request, Response } from "express";
import { Session } from "express-session"; // Import Session type from express-session

interface CustomSession extends Session {
    refreshToken?: string;
}

export default (dependencies: any) => {
    const { useCase: { refreshTokeUsecase } } = dependencies;

    const refreshToken = async (req: Request, res: Response) => {
        const reference = await refreshTokeUsecase(dependencies);
        const { executeFunction } = reference;
        
        // Cast req.session to CustomSession
        const customSession = req.session as CustomSession;
        
        const token = customSession.refreshToken; // Access refreshToken property
        if (!token) {
            return res.status(403).json('Token not found');
        }
        const NewAccessToken = await executeFunction(token);
        if (!NewAccessToken) {
            return res.status(203).json(NewAccessToken.message);
        }
        res.status(200).send(NewAccessToken.accessToken);
    };
    return refreshToken;
};
