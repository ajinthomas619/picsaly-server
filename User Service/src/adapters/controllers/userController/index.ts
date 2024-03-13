import addProfileController from "./addProfileController";
import editProfileController from "./editProfileController";
import addProfileImageController from "./addProfileImageController";
import getAllUsersController from "./getAllUsersController";
import getSearchUserController from "./getSearchUserController";
import getUserByIdController from "./getUserByIdController";
import getUserDataController from "./getUserDataController";
import getUsersByNameController from "./getUsersByNameController";
export default(dependencies:any) => {
return {
    addProfileController:addProfileController(dependencies),
    editProfileController:editProfileController(dependencies),
    addProfileImageController:addProfileImageController(dependencies),
    getAllUsersController:getAllUsersController(dependencies),
    getSearchUserController:getSearchUserController(dependencies),
    getUserByIdController:getUserByIdController(dependencies),
    getUserDataController:getUserDataController(dependencies),
    getUsersByNameController:getUsersByNameController(dependencies)    

}
}