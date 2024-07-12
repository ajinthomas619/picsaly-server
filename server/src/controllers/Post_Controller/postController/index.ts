import showAllPostController from "./showAllPostController";
import addPostController from "./addPostController";
import addCommentController from "./addCommentController";
import getPostController from "./getPostController";
import editPostController from "./editPostController";
import deletePostController from "./deletePostController";
import likePostController from "./likePostController";
import getAllPostOfUserController from "./getAllPostOfUserController";
import deleteCommentController from "./deleteCommentController"
import editCoommentController from "./editCommentController"
import getSavedPostController from "./getSavedPostsController"
import searchPostController from "./searchPostController";
import replyToCommentController from "./replyToCommentController"
import likeCommentController from "./likeCommentController"
import getLikedPostController from "./getLikedPostController";
import getMonthlyPostCountController from "./getMonthlyPostCountController";
import reportPostController from "./reportPostController";
import updatePostStatusController from "./updatePostStatusController";
import showAllPostForAdminController from "./showAllPostForAdminController";
import showPostForHomeController from "../showPostForHomeController";
export default (dependencies: any) => {
    return{
        showAllPostController:showAllPostController(dependencies),
        addPostController:addPostController(dependencies),
        getPostController:getPostController(dependencies),
        editPostController:editPostController(dependencies),
        deletePostController:deletePostController(dependencies),
        likePostController:likePostController(dependencies),
        addCommentController:addCommentController(dependencies),
        getAllPostOfUserController:getAllPostOfUserController(dependencies),
        deleteCommentController:deleteCommentController(dependencies),
        editCommentController:editCoommentController(dependencies),
        getSavedPostController:getSavedPostController(dependencies),
        searchPostController:searchPostController(dependencies),
        replyToCommentController:replyToCommentController(dependencies),
        likeCommentController:likeCommentController(dependencies),
        getLikedPostController:getLikedPostController(dependencies),
        getMonthlyPostCountController:getMonthlyPostCountController(dependencies),
        reportPostController:reportPostController(dependencies),
        updatePostStatusController:updatePostStatusController(dependencies),
        showAllPostForAdminController:showAllPostForAdminController(dependencies),
        showPostForHomeController:showPostForHomeController(dependencies)

    }
}