import { Request, Response } from "express";

export default (dependencies: any) => {
    const {
        useCase: { verifyOtp_Usecase },
    } = dependencies;

    const verifyOtpcontroller = async (req: Request, res: Response) => {
        try {
            console.log("Session user data:", req.session.userData);
            const otp = req.body.otp;
            console.log("Received OTP:", otp);
            console.log("Session OTP:", req.session.otp);

            if (otp == req.session.otp) {
                const userData = req.session.userData;
                const response = await verifyOtp_Usecase(dependencies).executeFunction(userData);
                
                if (response.status) {
                    const { accessToken, refreshtToken, user } = response;

                    req.session.refreshtoken = refreshtToken;
                    res.cookie("user-accessToken", accessToken, {
                        maxAge: 300000,
                        httpOnly: true,
                        secure: true
                    });
                    res.cookie("user-refreshToken", refreshtToken, {
                        maxAge: 360000,
                        httpOnly: true,
                        secure: true
                    });

                    const userData = {
                        _id: user._id,
                        username: user?.username,
                        email: user?.email,
                        mobile: user?.mobile || "",
                        isGoogle: user?.isGoogle,
                        password: user?.password
                    };

                    res.status(201).json({ status: true, accessToken, user });
                } else {
                    res.status(401).json({ status: false, message: response.message });
                }
            } else {
                res.status(400).json({ status: false, message: "Invalid OTP" });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };

    return verifyOtpcontroller;
};
