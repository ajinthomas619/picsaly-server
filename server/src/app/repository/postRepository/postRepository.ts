import {
  PostData,
  Userdata,
  CommentObject,
  reportObject,
} from "../../../utils/interface/interface";
import { User } from "../../database/userModel";
import { Post } from "../../database/postModel";
import { Types } from "mongoose";
import mongoose from "mongoose";

export default {
  createPost: async (dataa: any) => {
    try {
      const { image, data } = dataa;
      const postData = { image, ...data };

      const response = await Post.create(postData);

      if (response) {
        const postWithUser = (await Post.findById(response._id).populate(
          "createdBy"
        )) as PostData;

        return {
          status: true,
          message: "Post created successfully",
          data: postWithUser,
        };
      } else {
        throw new Error("Error in creating the post");
      }
    } catch (error) {
      console.error(error);
      return { status: false, message: (error as Error).message };
    }
  },
  showAllPost: async (userId: string) => {
    try {
      const user = await User.findById(userId);

      const blockedUsers = user?.socialConnections?.blockedUsers;

      const response = await Post.find({
        Visibility: true,
        createdBy: { $nin: blockedUsers, $ne: userId },
      }).populate("createdBy");
      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, message: "No Post have been found" };
      }
    } catch (error) {
      console.log("error in showallpost", error);
    }
  },
  showPostForHome: async (userId: string,page:any,limit:any) => {
    const skip = (page - 1)*limit
    try {
      const user = await User.findById(userId);

      const blockedUsers = user?.socialConnections?.blockedUsers;
      const following = user?.socialConnections?.Following;

      const response = await Post.find({
        Visibility: true,
        createdBy: { $nin: blockedUsers, $ne: userId, $in: following },
      }).populate("createdBy")
      .skip(skip)
      .limit(limit)
      .exec();
      console.log("the response is ",response)
      if (response.length > 0) {
        return { status: true, data: response };
      } else {
        return { status: false, message: "No Post have been found" };
      }
    } catch (error) {
      console.log("error in showpost for home", error);
    }
  },

  editPost: async (id: string, data: PostData) => {
    try {
      const response = await Post.findByIdAndUpdate(
        id,
        {
          caption: data.caption,
          location: data.location,
          ...(data.tags ? { tags: data.tags } : {}),
        },
        { new: true }
      );

      if (response) {
        return { status: true, updatedPost: response };
      } else {
        return { status: false, message: "post not updated" };
      }
    } catch (error) {
      console.log("error in update post", error);
      return {
        status: false,
        message: "An error occurred while updating the post",
      };
    }
  },
  deletePost: async (id: string) => {
    try {
      const response = await Post.findByIdAndDelete(id);
      if (response) {
        return { status: true, message: "Post deleted successfully" };
      } else {
        return { status: false, messsage: "post deletion failed" };
      }
    } catch (error) {
      console.log("error in post deletion", error);
    }
  },
  likePost: async (postId: string, userId: string, liked: boolean) => {
    try {
      let updateQuery;
      let message;
      let operationStatus;

      const postObjectId = new Types.ObjectId(postId);

      const post = await Post.findById(postId);

      if (!post) {
        return { status: false, message: "Post not found" };
      }

      const userLiked = post.Likes.some(
        (like) => like.userId?.toString() === userId
      );
      if (liked && userLiked) {
        return { status: false, message: "User already liked this post" };
      }

      if (liked) {
        updateQuery = {
          $push: { Likes: { userId: userId, likescount: 1 } },
        };
        message = "liked";
        operationStatus = true;
      } else {
        updateQuery = {
          $pull: { Likes: { userId: userId } },
        };
        message = "like removed";
      }

      const response = await Post.findByIdAndUpdate(postId, updateQuery, {
        new: true,
      });

      const totalLikes = response?.Likes.reduce(
        (total, like) => total + (like.likescount ?? 0),
        0
      );

      const user = await User.findById(userId);
      if (user) {
        if (liked) {
          if (!user.activity?.likes.includes(postObjectId)) {
            user.activity?.likes.push(postObjectId);
          }
        } else {
          if (user.activity?.likes) {
            const index = user.activity?.likes.indexOf(postObjectId);
            if (index > -1) {
              user.activity?.likes.splice(index, 1);
            }
          }
        }
        await user.save();
      }
      return {
        status: true,
        message: message,
        likes: totalLikes,
      };
    } catch (error) {
      console.log("error in post repo", error);
      return { status: false, message: "like unsuccessful" };
    }
  },
  addComment: async (postId: string, comment: CommentObject) => {
    try {
      const response = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { comments: comment },
        },
        { new: true }
      ).populate("comments.userId");

      const comments = response?.comments;

      return {
        status: true,
        message: "comment added successfully",
        comment: comments,
      };
    } catch (error) {
      console.log("Error in adding Comment ", error);
      return { status: false, message: "error in adding comment" };
    }
  },
  getPost: async (id: string) => {
    try {
      const response = await Post.findById(id).populate("comments.userId");

      if (!response) {
        return { status: false, message: "no such post found" };
      } else {
        const postwithUser = await Post.findById(response._id)
          .populate("createdBy")
          .populate("comments.userId")
          .populate("comments.replies.userId");

        return { status: true, data: postwithUser };
      }
    } catch (error) {
      console.log("error in fetching post", error);
    }
  },
  replyToComment: async (
    commentId: string,
    commentData: CommentObject,
    postId: String
  ) => {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        return { status: false, message: "Post not found" };
      }
      const comment = post?.comments.find(
        (comment: any) => comment?._id?.toString() === commentId
      );

      if (!comment) {
        return { status: false, message: "Comment not found" };
      }
      comment.replies.push(commentData);
      const replies = await post.save();
      console.log("repliesssss", replies);
      if (replies) {
        return {
          status: true,
          message: "replies added successfully",
          replies: replies,
        };
      }
    } catch (error) {
      console.log("error in reply to comment repository:", error);
      return { status: false, message: "error in adding reply" };
    }
  },
  editComment: async (
    postId: string,
    commentData: string,
    commentId: string
  ) => {
    try {
      const post = await Post.findById(postId);

      const commentObjectId = new Types.ObjectId(commentId);

      if (!post) {
        return { status: false, message: "Post not found" };
      }
      const comment = post.comments.find(
        (comment) =>
          comment && comment._id && comment._id.equals(commentObjectId)
      );

      if (!comment) {
        return { status: false, message: "comment not found" };
      }

      comment.text = commentData;

      const newComment = await post.save();
      if (newComment) {
        return { status: true, message: "comment edited successfully" };
      }
    } catch (error) {
      console.log("error in edit comment repository", error);
      return { status: false, message: "message edit unsuccessful" };
    }
  },
  likeComment: async (
    postId: string,
    userId: string,
    commentId: string,
    Liked: Boolean
  ) => {
    try {
      if (!Liked) {
        const post = await Post.findById(postId);

        if (!post) {
          return { status: false, message: "post not found" };
        }
        const comment = post.comments.find(
          (comment) => comment?._id?.toString() === commentId
        );

        if (!comment) {
          return { status: false, message: "Comment not found" };
        }
        if (comment.likes.includes(userId)) {
          comment.likes = comment.likes.filter((id) => id !== userId);
        }
        comment.likes.push(userId);

        const liked = await post.save();
        if (liked) {
          return { status: true, message: "Comment liked successfully" };
        }
      }
    } catch (error) {
      console.log("error in likecomment repository", error);
      return { status: false, message: "comment like unsuccessfull" };
    }
  },

  deleteComment: async (postId: string, commentId: string) => {
    try {
      const response = await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );

      if (response) {
        return { status: true, message: "comment deleted successfully" };
      } else {
        return { status: false, message: "comment not deleted" };
      }
    } catch (error) {
      console.log("error in delete comment repository", error);
      return { status: false, message: "comment not deleted" };
    }
  },
  searchPost: async (regex: string) => {
    try {
      const posts = await Post.find({
        caption: { $regex: new RegExp(`${regex}`, "i") },
      });
      if (posts) {
        return { status: true, message: "posts found", posts: posts };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in search post repository", error);
      return { status: false, message: "error in finding post" };
    }
  },
  getSavedPosts: async (userId: any) => {
    try {
      const id = userId.userId;
      const posts = await User.findById(id)
        .populate({
          path: "activity.saved",
          model: "Post",
        })
        .exec();

      const savedpost = posts?.activity?.saved;
      if (savedpost) {
        return { status: true, message: "posts found", posts: savedpost };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in getSavedPostRepo", error);
      return { status: false, message: "post not found" };
    }
  },
  getPostdFromFollowing: async (following: string[]) => {
    try {
      const posts = await Post.find({ createdBy: { $in: following } }).populate(
        "createdBy"
      );
      if (posts) {
        return { status: true, message: "posts found", posts: posts };
      } else {
        return { status: false, message: "post not found" };
      }
    } catch (error) {
      console.log("error in getP:ostfromFollowing repo", error);
      return { status: false, message: "post not found" };
    }
  },
  getLikedPost: async (userId: any) => {
    try {
      const id = userId;
      const posts = await User.findById(id)
        .populate({
          path: "activity.likes",
          model: "Post",
        })
        .exec();

      const likedposts = posts?.activity?.likes;
      if (likedposts) {
        return { status: true, message: "posts found", data: likedposts };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in getLikedPostRepo", error);
      return { status: false, message: "posts not found " };
    }
  },
  getMonthlyPostCount: async () => {
    try {
      const postsPerMonth = await Post.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      const resultArray = postsPerMonth.map((item) => ({
        x: item._id,
        y: item.count,
      }));
      if (postsPerMonth) {
        return {
          status: true,
          message: "count successfull",
          postsPerMonth: resultArray,
        };
      }
    } catch (error) {
      console.log("error in getting monthlyPostCount  repo", error);
      return { status: false, message: "count unsuccessfull" };
    }
  },
  reportPost: async (
    postId: string,
    userId: String,
    reportObject: reportObject
  ) => {
    try {
      const post = await Post.findById(postId);
      const response = post?.reportedUsersList.push(userId);
      await post?.save();

      if (response) {
        return { status: true, message: "reported successfully" };
      } else {
        return { status: false, message: "report unsuccessfull" };
      }
    } catch (error) {
      console.log("error in reporting post", error);
      return { status: false, message: "report unsuccessfull" };
    }
  },
  updatePostStatus: async (postId: string) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        console.log("post not found");
        return;
      }

      post.Visibility = !post.Visibility;
      await post.save();

      if (post) {
        return { status: true, message: "post status changed", post: post };
      } else {
        return { status: false, message: "something error occured" };
      }
    } catch (error) {
      console.log("error in updating post status", error);
      return { status: false, message: "internal server error" };
    }
  },
  showAllPostForAdmin: async () => {
    try {
      const response = await Post.find({}).populate("createdBy");
      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, message: "nothing found" };
      }
    } catch (error) {
      console.log("error in finding post for admin", error);
    }
  },
};
