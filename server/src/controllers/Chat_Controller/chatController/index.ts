
import getConversationController from "./getConversationsController"
import getMessageController from "./getMessagesController"
import sendMessageController from "./sendMessageController"
import conversationController from "./conversationController"
import singleUserSendFileController from "./singleUserSendFileController"
import createNewGroupController from "./createNewGroupController"
import deleteMessageController from "./deleteMessageController"
import getAllGroupOfusersController from "./getAllGroupOfusersController"
import getGroupDataByIdController from "./getGroupDataByIdController"
import getGroupMessagesController from "./getGroupMessagesController"
import groupSendFileController from "./groupSendFileController"
import sendGroupMessageController from "./sendGroupMessageController"
import sendVoiceMessageController from "./sendVoiceMessageController"
import videoCallController from "./videoCallController"
export default (dependencies:any) => {
    return {
        getConversationController:getConversationController(dependencies),
        getMessageController:getMessageController(dependencies),
        sendMessageController:sendMessageController(dependencies),
        conversationController:conversationController(dependencies),
        singleUserSendFileController:singleUserSendFileController(dependencies),
        createNewGroupController:createNewGroupController(dependencies),
        deleteMessageController:deleteMessageController(dependencies),
        getAllGroupOfUsersController:getAllGroupOfusersController(dependencies),
        getGroupDataByIdController:getGroupDataByIdController(dependencies),
        getGroupMessagesController:getGroupMessagesController(dependencies),
        groupSendFileController:groupSendFileController(dependencies),
        sendGroupMessageController:sendGroupMessageController(dependencies),
        sendVoiceMessageController:sendVoiceMessageController(dependencies),
        videoCallController:videoCallController(dependencies)
    }
}