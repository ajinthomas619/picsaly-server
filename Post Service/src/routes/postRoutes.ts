import express from 'express'
import { postController } from '../adapters/controllers'


export default (dependencies:any) =>{
    const router = express.Router()
    const {
        showAllPostController,
        addPostController
    } = postController(dependencies)

    router.post('/create-post',addPostController)
    router.get('post',showAllPostController)




    return router
}