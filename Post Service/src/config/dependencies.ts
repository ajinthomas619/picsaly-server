import { postRepository } from "../app/repository";
import { AddPost_Usecase,showAllPostUsecase,likePost_useCase,editPost_useCase
,deletePost_useCase,addComment_useCase,getPost_useCase,getAllPostOfUserUsecase} from "../useCases/postUsecase/index";
import {createUserUsecase} from '../useCases/consumeUsecase/authConsumeUsecase'



const useCase:any ={
    AddPost_Usecase,
    showAllPostUsecase,
    likePost_useCase,
    editPost_useCase,
    deletePost_useCase,
    addComment_useCase,
    getPost_useCase,
    getAllPostOfUserUsecase
}
const consumeUsecase:any = {
    createUserUsecase
}

const repository:any = {
    postRepository
}

export default {useCase,repository,consumeUsecase}