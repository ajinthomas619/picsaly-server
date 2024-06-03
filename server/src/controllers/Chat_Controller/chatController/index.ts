
import getConversationController from "./getConversationsController"
import getMessageController from "./getMessagesController"
import sendMessageController from "./sendMessageController"
import conversationController from "./conversationController"
export default (dependencies:any) => {
    return {
        getConversationController:getConversationController(dependencies),
        getMessageController:getMessageController(dependencies),
        sendMessageController:sendMessageController(dependencies),
        conversationController:conversationController(dependencies)
    }
}