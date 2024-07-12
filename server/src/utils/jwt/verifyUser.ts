import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createAccessToken } from "./jwt";
import { Userdata } from "../interface/interface";

interface CustomRequest extends Request {
    user?: Userdata;
}

export const verifyUser = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
  
    const userAccessToken = req.cookies.user_accessToken;
    const userRefreshToken = req.cookies.user_refreshToken;

    if (!userRefreshToken) {
        return res.status(401).json({ message: "Refresh token not found" });
    }

    jwt.verify(
        userAccessToken,
        process.env.ACCESS_SECRET_KEY || "",
        (err: jwt.VerifyErrors | null, decoded: any) => {
            if (err) {
              
                if (
                    (err.name === "TokenExpiredError" ||
                        err.name === "JsonWebTokenError") &&
                    userRefreshToken
                ) {
                    jwt.verify(
                        userRefreshToken,
                        process.env.REFRESH_SECRET_KEY || "",
                        (errRefresh: jwt.VerifyErrors | null, decodedRefresh: any) => {
                            if (errRefresh) {
                                return res.status(401).json("invalid refresh token");
                            }
                            const user = decodedRefresh.user;

                            const newAccessToken = createAccessToken(
                                user,
                                process.env.ACCESS_SECRET_KEY || "",
                                "15m"
                            );
                            res.cookie("accessToken", newAccessToken, {
                                maxAge: 300000,
                                httpOnly: true,
                                secure: true,
                                sameSite: "strict",
                            });
                            req.user = user;
                            next();
                        }
                    );
                } else {
                    return res.status(401).json({
                        status: false,
                        message: "Unauthorized - no token provided",
                    });
                }
            } else {
                const decodedUser = decoded.user as Userdata;
                req.user = decodedUser;
                next();
            }
        }
    );
};
