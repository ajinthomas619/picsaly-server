import express from 'express'
import { authController } from '../controllers/Auth_Controler'
import {userController} from '../controllers/User_Controller'
import {postController} from '../controllers/Post_Controller'
import { chatController } from '../controllers/Chat_Controller'
import authMiddleware from '../middlewares/authMiddleware'
import {upload} from '../utils/multer/multer'
import axios from 'axios'
import getFollowersController from '../controllers/User_Controller/userController/getFollowersController'

export default (dependencies:any) => {
    const router = express.Router()
const {
    loginController,
    signupControler,
    verifyOtpController,
    googleLoginContoller,
    logoutController,
    adminloginController,
    refreshTokenController
} = authController(dependencies)

const {
    getUserDataController,
    getUserByIdController,
    getAllUsersController,
    getSearchUserController,
    getUsersByNameController,
    unblockUserController,
    blockUserController,
    editProfileController,
    followUserController,
    addProfileController,
    addProfileImageController,
    savePostController,
    getCreatedPostController,
    getSuggestedUserController,
    getMonthlyUserCountController,
    changeUserStatusController,
    getFollowersController,
    getFollowingController


} = userController(dependencies)

const {
    showAllPostController,
    addCommentController,
    addPostController,
    editPostController,
    deletePostController,
    likePostController,
    getPostController,
    getAllPostOfUserController,
    likeCommentController,
    deleteCommentController,
    editCommentController,
    getSavedPostController,
    replyToCommentController,
    searchPostController,
    getLikedPostController,
    getMonthlyPostCountController,
    reportPostController,
    updatePostStatusController,
    showAllPostForAdminController
     
     
     


} = postController(dependencies)

const{
    getMessageController,
    getConversationController,
    sendMessageController,
    conversationController
} = chatController(dependencies)
 

 //Auth Routes

router.post('/login', loginController)
router.post('/signup',signupControler)
router.post('/verify-otp',verifyOtpController)
router.post('/googleLogin',googleLoginContoller)
router.get('/logout',logoutController)
router.post('/adminlogin',adminloginController)
router.get('/refresh',refreshTokenController)

// User Routes

router.post('/getUserData',getUserDataController)
router.get('/getAllUsers',getAllUsersController)
router.get('/getSearchUser/:user',getSearchUserController)
router.post('/addProfile',addProfileController)
router.post('/editProfile/:id',editProfileController)
router.post('/addProfileImage/:id',upload.single("profileImage"),addProfileImageController)
router.post('/getUsersByName',getUsersByNameController)
router.get('/getUserById/:id',getUserByIdController)
router.post('/followUser',followUserController )
router.post('/savepost',savePostController)
router.post('/blockuser',blockUserController)
router.post('/unblockuser',unblockUserController)
router.get('/getCreatedPost/:id',getCreatedPostController)
router.get('/getMonthlyUsers',getMonthlyUserCountController)
router.post('/changeuserstatus',changeUserStatusController)


// Post routes

router.post('/create-post',upload.array('image'),addPostController)
router.get('/all-post',showAllPostController)
router.get('/get-post/:id',getPostController)
router.put('/edit-post/:id',upload.array('image'),editPostController)
router.delete('/delete-post/:id',deletePostController)
router.post('/like-post/:id',likePostController)
router.post('/comment-post/:id',addCommentController) 
router.put('/edit-comment/:postId',editCommentController)
router.post('/like-comment/:commentId',likeCommentController)
router.delete("/delete-comment/:commentId",deleteCommentController)
router.get('/search-post/:regex',searchPostController)
router.post('/get-saved-post/:userId',getSavedPostController)
router.post('/reply-to-comment/:commentId',replyToCommentController)
router.get('/getLikedPosts/:id',getLikedPostController)
router.get('/getSuggestedUsers/:id',getSuggestedUserController)
router.get('/getMonthlyPost',getMonthlyPostCountController)
router.post('/report-post/:postId',reportPostController)
router.post('/updatepoststatus',updatePostStatusController),
router.get('/showall',showAllPostForAdminController),
router.get('/getFollowers/:id',getFollowersController)
router.get('/getFollowing/:id',getFollowingController)



 // Message Routes

 
router.post("/get-messages/:userId",getMessageController)
router.post("/send/:userId",sendMessageController)
router.post("/get-conversations/:userId",getConversationController)
router.post('/conversation',conversationController)



return router

}