import addProfileController from "./addProfileController";
import editProfileController from "./editProfileController";
import addProfileImageController from "./addProfileImageController";
import getAllUsersController from "./getAllUsersController";
import getSearchUserController from "./getSearchUserController";
import getUserByIdController from "./getUserByIdController";
import getUserDataController from "./getUserDataController";
import getUsersByNameController from "./getUsersByNameController";
import followUserController from "./followUserController";
import blockUserController from "./blockUserController";
import unblockUserController from "./unblockUserController";
import savePostController from "./savePostController";
import getCreatedPostController from "./getCreatedPostController";
import getSuggestedUserController from "./getSuggestedUserController";
export default(dependencies:any) => {
return {
    addProfileController:addProfileController(dependencies),
    editProfileController:editProfileController(dependencies),
    addProfileImageController:addProfileImageController(dependencies),
    getAllUsersController:getAllUsersController(dependencies),
    getSearchUserController:getSearchUserController(dependencies),
    getUserByIdController:getUserByIdController(dependencies),
    getUserDataController:getUserDataController(dependencies),
    getUsersByNameController:getUsersByNameController(dependencies)    ,
    followUserController:followUserController(dependencies),
    blockUserController:blockUserController(dependencies),
    unblockUserController:unblockUserController(dependencies), 
    savePostController:savePostController(dependencies),
    getCreatedPostController:getCreatedPostController(dependencies),
    getSuggestedUserController:getSuggestedUserController(dependencies)
}
}