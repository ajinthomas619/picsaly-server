import showAllPostController from "./showAllPostController";
import addPostController from "./addPostController";
import addCommentController from "./addCommentController";
import getPostController from "./getPostController";
import editPostController from "./editPostController";
import deletePostController from "./deletePostController";
import likePostController from "./likePostController";
import getAllPostOfUserController from "./getAllPostOfUserController";
export default (dependencies: any) => {
    return{
        showAllPostController:showAllPostController(dependencies),
        addPostController:addPostController(dependencies),
        getPostController:getPostController(dependencies),
        editPostController:editPostController(dependencies),
        deletePostController:deletePostController(dependencies),
        likePostController:likePostController(dependencies),
        addCommentController:addCommentController(dependencies),
        getAllPostOfUserController:getAllPostOfUserController(dependencies)
    }
}