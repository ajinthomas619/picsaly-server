import express from 'express'
 import { userController } from '../../adapters/controllers'
 import { upload } from '../../utils/multer/multer'

 export default (dependencies:any)=>{
    const router = express()
    const{
        getUserDataController,
        getUserByIdController,
        getSearchUserController,
        addProfileController,
        addProfileImageController,
        editProfileController,
        getAllUsersController,
        getUsersByNameController,
        followUserController,
        savePostController,
        blockUserController,
        unblockUserController

    } = userController(dependencies)

    router.post('/getUserData',getUserDataController)
    router.get('/getAllUsers',getAllUsersController)
    router.get('/getSearchUser/:user',getSearchUserController)
    router.post('/addProfile',addProfileController)
    router.post('/editProfile',editProfileController)
    router.post('/addProfileImage',upload.single("file"),addProfileImageController)
    router.post('/getUsersByName',getUsersByNameController)
    router.post('/getUserById',getUserByIdController)
    router.post('/followUser',followUserController )
    router.post('/savepost',savePostController)
    router.post('blockuser',blockUserController)
    router.post('/unlockuser',unblockUserController)

    return router

 }