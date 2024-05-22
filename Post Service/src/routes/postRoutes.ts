import express from 'express'
import { postController } from '../adapters/controllers'
import { upload } from '../utils/multer/multerSetup'
import getAllPostOfUserController from '../adapters/controllers/postController/getAllPostOfUserController'





export default (dependencies:any) =>{
    const router = express.Router()
    const {
        showAllPostController,
        addPostController,
        getPostController,
        editPostController,
        deletePostController,
        likePostController,
        addCommentController,
        getAllPostOfUserController

    } = postController(dependencies)

    router.post('/create-post',upload.array('image'),addPostController)
    router.get('/all-post',showAllPostController)
    router.get('/get-post/:id',getPostController)
    router.put('/edit-post/:id',upload.array('image'),editPostController)
    router.delete('/delete-post/:id',deletePostController)
    router.post('/like-post/:id',likePostController)
    router.post('/comment-post/:id',addCommentController)  
    router.get("/getAllPost",getAllPostOfUserController)

    return router
}