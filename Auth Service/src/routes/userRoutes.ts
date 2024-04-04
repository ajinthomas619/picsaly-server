import express from 'express'
import { userController } from '../adpaters'
import authMiddleware from '../middlewares/authMiddleware'
import axios from 'axios'
import { log } from 'console'


export default (dependencies:any)=>{
    const router = express.Router()
    const {
        loginController,
        signupControler,
        verifyOtpController,
        googleLoginContoller,
        logoutController,
        adminloginController,
        refreshTokenController
        
    } = userController(dependencies)

router.post('/', loginController)
router.post('/signup',signupControler)
router.post('/verify-otp',verifyOtpController)
router.post('/googleLogin',googleLoginContoller)
router.get('/logout',logoutController)
router.post('/adminlogin',adminloginController)
router.get('/refresh',refreshTokenController)

 
 

return router
}