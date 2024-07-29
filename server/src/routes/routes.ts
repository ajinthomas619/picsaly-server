import express from 'express'
import { authController } from '../controllers/Auth_Controler'
import {userController} from '../controllers/User_Controller'
import {postController} from '../controllers/Post_Controller'
import { chatController } from '../controllers/Chat_Controller'
import { notificationController } from '../controllers/Notification_Controller'
import {upload} from '../utils/multer/multer'
import { uploadChat } from '../utils/multer/multerChat'
import axios from 'axios'
import { verifyUser } from '../utils/jwt/verifyUser'

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
    showAllPostForAdminController,
    showPostForHomeController
     
     
     


} = postController(dependencies)

const{
    getMessageController,
    getConversationController,
    sendMessageController,
    conversationController,
    deleteMessageController,
    getGroupDataByIdController,
    sendGroupMessageController,
    groupSendFileController,
    createNewGroupController,
    singleUserSendFileController,
    getGroupMessagesController,
   sendVoiceMessageController,
   videoCallController
} = chatController(dependencies)

const{
getNotificationOfAllUsersController,
sendNotificationController,
clearNotificationController
} = notificationController(dependencies)
 

 //Auth Routes

router.post('/login', loginController)
router.post('/signup',signupControler)
router.post('/verify-otp',verifyOtpController)
router.post('/googleLogin',googleLoginContoller)
router.get('/logout',logoutController)
router.post('/adminlogin',adminloginController)
router.get('/refresh',refreshTokenController)

// User Routes

router.post('/getUserData',verifyUser,getUserDataController)
router.get('/getAllUsers/:id',getAllUsersController)
router.get('/getSearchUser/:user',verifyUser,getSearchUserController)
router.post('/addProfile',verifyUser,addProfileController)
router.post('/editProfile/:id',verifyUser,editProfileController)
router.post('/addProfileImage/:id',verifyUser,upload.single("profileImage"),addProfileImageController)
router.post('/getUsersByName',verifyUser,getUsersByNameController)
router.get('/getUserById/:id',verifyUser,getUserByIdController)
router.post('/followUser',verifyUser,followUserController )
router.post('/savepost',verifyUser,savePostController)
router.post('/blockuser',verifyUser,blockUserController)
router.post('/unblockuser',verifyUser,unblockUserController)
router.get('/getCreatedPost/:id',getCreatedPostController)
router.get('/getMonthlyUsers',getMonthlyUserCountController)
router.post('/changeuserstatus',changeUserStatusController)


// Post routes

router.post('/create-post',verifyUser,upload.array('image'),addPostController)
router.get('/all-post/:id',showAllPostController)
router.get('/get-post/:id',getPostController)
router.put('/edit-post/:id',upload.array('image'),editPostController)
router.delete('/delete-post/:id',deletePostController)
router.post('/like-post/:id',likePostController)
router.post('/comment-post/:id',verifyUser,addCommentController) 
router.put('/edit-comment/:postId',editCommentController)
router.post('/like-comment/:commentId',likeCommentController)
router.delete("/delete-comment/:commentId",deleteCommentController)
router.get('/search-post/:regex',verifyUser,searchPostController)
router.post('/get-saved-post/:userId',getSavedPostController)
router.post('/reply-to-comment/:commentId',replyToCommentController)
router.get('/getLikedPosts/:id',verifyUser,getLikedPostController)
router.get('/getSuggestedUsers/:id',verifyUser,getSuggestedUserController)
router.get('/getMonthlyPost',getMonthlyPostCountController)
router.post('/report-post/:postId',verifyUser,reportPostController)
router.post('/updatepoststatus',updatePostStatusController),
router.get('/showall',showAllPostForAdminController),
router.get('/getFollowers/:id',verifyUser,getFollowersController)
router.get('/getFollowing/:id',verifyUser,getFollowingController)
router.get('/show-post/:id',showPostForHomeController)



 // Message Routes

 
router.post("/get-messages/:userId",getMessageController)
router.post("/send/:userId",verifyUser,sendMessageController)
router.post("/get-conversations/:userId",verifyUser,getConversationController)
router.post('/conversation',verifyUser,conversationController)
router.delete('/deleteMessage/:id',deleteMessageController)
router.post('/createNewGroup',createNewGroupController)
router.post('/sendGroupMessage',sendGroupMessageController)
router.post('/sendVoiceMessage',uploadChat.single('audio'),singleUserSendFileController)
router.post('/groupVoiceMessage',uploadChat.single('audio'),sendVoiceMessageController)
router.post('/sendFile/:userId',uploadChat.single('file'),singleUserSendFileController)
router.get('/getSingleGroupMessage',getGroupMessagesController)
router.get('/getGroupDataById',getGroupDataByIdController)
router.post("/videocall/:receiverId",verifyUser,videoCallController)

router.post('/notification',sendNotificationController)
router.get('/getNotificationOfUser/:userId',verifyUser,getNotificationOfAllUsersController)
router.post('/clearNotification/:userId',clearNotificationController)
return router

}