import { createAccessToken, createRefreshToken } from '../../../utils/jwt/jwt';
import { hashPassword } from "../../../utils/hashPassword/hashPassword";

export const verifyOtp_Usecase = (dependencies: any) => {
    const { repository: { userRepository } } = dependencies;
    
    const executeFunction = async (data: any) => {
        try {
            console.log("Original data:", data.password);
            const hashedPassword = await hashPassword(data?.password);
            const updatedData = { ...data, password: hashedPassword };
            console.log("Updated data:", updatedData);

            const addUserData = await userRepository.createUser(updatedData);
            console.log("Add user data:", addUserData);
            
            if (addUserData.status) {
                if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY || !process.env.ACCESS_EXPIRY || !process.env.REFRESH_EXPIRY) {
                    throw new Error("Environment variables for JWT secrets and expiry times are not set");
                }

                const accessToken = createAccessToken(
                    addUserData,
                    process.env.ACCESS_SECRET_KEY!,
                    process.env.ACCESS_EXPIRY!
                );
                const refreshToken = createRefreshToken(
                    addUserData,
                    process.env.REFRESH_SECRET_KEY!,
                    process.env.REFRESH_EXPIRY!
                );
                return { status: true, accessToken, refreshToken, user: addUserData, message: "OTP verified" };
            } else {
                return { status: false, message: "User creation failed" };
            }
        } catch (error) {
            console.error("Error in OTP use case:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };
    
    return {
        executeFunction
    };
};
