import {userRepository} from '../app/repository'
import { addProfileUsecase } from '../use_Cases/user/addProfileUsecase'
import {addProfileImageUsecase} from '../use_Cases/user/addProfileImageUsecase'
import {editUserUsecase} from '../use_Cases/user/editProfileUsecase'
import {getAllUsersUsecase}  from '../use_Cases/user/getAllUsersUsecase'
import {getUserByIdUse_Case} from '../use_Cases/user/getUserByIdUsecase'
import {getUserByNameUsecase} from  '../use_Cases/user/getUserByNameUsecase'
import {getUserDataUsecase} from '../use_Cases/user/getUserDataUsecase'
import {getSearchUserUsecase} from '../use_Cases/user/getSearchUserUsecase'
import { createUserUsecase } from '../use_Cases/consumeUsecases'
import { followUser_Usecase } from '../use_Cases/user'
import { BlockUser_Usecase } from '../use_Cases/user'
import { UnblockUser_Usecase } from '../use_Cases/user'
import { SavePost_Usecase } from '../use_Cases/user'
const useCase:any = {
    addProfileUsecase,
    addProfileImageUsecase,
    editUserUsecase,
    getAllUsersUsecase,
    getUserByIdUse_Case,
    getUserByNameUsecase,
    getUserDataUsecase,
    getSearchUserUsecase,
    followUser_Usecase,
    BlockUser_Usecase,
    UnblockUser_Usecase,
    SavePost_Usecase
}

const consumeUsecase:any = {
    createUserUsecase
}
 
const repository:any = {
    userRepository
}

export default{useCase,repository,consumeUsecase}