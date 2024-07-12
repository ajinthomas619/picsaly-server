import dependencies from "../../../config/dependencies";
import getNotificationOfAllUsersController from "./getNotificationOfAllUsersController";
import sendNotificationController from "./sendNotificationController";
import clearNotificationController from "./clearNotificationController";

export default (dependencies:any) => {
    return{
    getNotificationOfAllUsersController:getNotificationOfAllUsersController(dependencies),
    sendNotificationController:sendNotificationController(dependencies),
    clearNotificationController:clearNotificationController(dependencies)
} 
}