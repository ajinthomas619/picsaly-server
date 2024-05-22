import {authRepository} from '../app/repository/authRepository'
import { userRepository } from '../app/repository/userRepository'
import { postRepository } from '../app/repository/postRepository'
import {addUser_useCase} from '../useCases/Auth_Usecases/user/create_user'
import {userLogin_useCase} from '../useCases/Auth_Usecases/user/login'
import {verifyOtp_Usecase} from '../useCases/Auth_Usecases/user/verifyotp'
import { loginWithGoogle_Usecase } from '../useCases/Auth_Usecases/user/googleLogin'
import {adminAuth_UseCase} from '../useCases/Auth_Usecases/user/adminlogin'
import {refreshTokeUsecase} from '../useCases/Auth_Usecases/user/refreshToken'
import { showAllPostUsecase } from '../useCases/Post_Usecases'
import { AddPost_Usecase } from '../useCases/Post_Usecases'
import { getPost_useCase } from '../useCases/Post_Usecases'
import {getUserByIdUse_Case} from '../useCases/User_Usecases'
import  {likePost_useCase} from '../useCases/Post_Usecases'
import { addComment_useCase } from '../useCases/Post_Usecases'
import { editUserUsecase } from '../useCases/User_Usecases'
import { addProfileUsecase } from '../useCases/User_Usecases'
import { addProfileImageUsecase } from '../useCases/User_Usecases'
import { getAllUsersUsecase } from '../useCases/User_Usecases'
import { deleteComment_useCase } from '../useCases/Post_Usecases'
import { getSavedPost_useCase } from '../useCases/Post_Usecases'
import { searchPost_useCase } from '../useCases/Post_Usecases'
import { editComment_useCase } from '../useCases/Post_Usecases'
import { replyToComment_useCase } from '../useCases/Post_Usecases'
import { likeComment_useCase } from '../useCases/Post_Usecases'
import { SavePost_Usecase } from '../useCases/User_Usecases'
import { editPost_useCase } from '../useCases/Post_Usecases'
import { getCreatedPost_useCase } from '../useCases/User_Usecases'
import { getLikedPosts_useCase } from '../useCases/Post_Usecases/postUsecase'
import { followUser_Usecase } from '../useCases/User_Usecases'
import { getSuggestedUser_useCase } from '../useCases/User_Usecases'
import { getSearchUserUsecase } from '../useCases/User_Usecases'




const useCase : any ={
addUser_useCase,
userLogin_useCase,
verifyOtp_Usecase,
loginWithGoogle_Usecase,
adminAuth_UseCase,
refreshTokeUsecase,
showAllPostUsecase,
AddPost_Usecase ,
getPost_useCase,
getUserByIdUse_Case,
likePost_useCase,
addComment_useCase,
editUserUsecase,
addProfileUsecase,
addProfileImageUsecase,
getAllUsersUsecase,
deleteComment_useCase,
getSavedPost_useCase,
searchPost_useCase,
editComment_useCase,
likeComment_useCase,
replyToComment_useCase,
SavePost_Usecase,
editPost_useCase,
getCreatedPost_useCase,
getLikedPosts_useCase,
followUser_Usecase,
getSuggestedUser_useCase,
getSearchUserUsecase



}


const repository:any ={
    authRepository,
    userRepository,
    postRepository
}

export default {repository,useCase}