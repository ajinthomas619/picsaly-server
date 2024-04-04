import loginController from "./loginController";
import signupControler from "./signupControler";
import verifyOtpController from "./verifyOtpController";
import googleLoginContoller from "./googleLoginContoller";
import logoutController from "./logoutController";
import adminloginController from "./adminloginController";
import refreshTokenController from "./refreshTokenController";

export default (dependencies:any)=>{
    return{
        signupControler:signupControler(dependencies),
        verifyOtpController : verifyOtpController(dependencies),
        loginController:loginController(dependencies),
        googleLoginContoller:googleLoginContoller(dependencies),
        logoutController:logoutController(dependencies),
        adminloginController:adminloginController(dependencies),
        refreshTokenController:refreshTokenController(dependencies)
    }
}
