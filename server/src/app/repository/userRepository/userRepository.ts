import { User } from "../../database/userModel";
import { connections } from "mongoose";
import { Post } from "../../database/postModel";
import { Types } from "mongoose";
import mongoose from "mongoose";

export default {
  async createUser(data: any) {
    try {
      const profileUrl = data.profilePic ?? data?.profileUrl ?? "";

      const userData = {
        "basicInformation.userId": data._id,
        "basicInformation.fullname": data.fullname,
        "basicInformation.email": data.email,
        "profile.profileUrl": profileUrl,
        "basicInformation.isGoogle": data.isGoogle,
        "basicInformation.username": data.name,
        "basicInformation.password": data.password,
        "basicInformation.phone": data.mobile,
        "profile.Bio": data.bio ?? "",
      };

      const response = await User.create(userData);

      if (response) {
        return { status: true, message: "user created successfully", response };
      } else {
        return { status: false, message: "user creation failed" };
      }
    } catch (error) {
      console.log("error in creating user", error);
    }
  },
  findUser: async (email: string) => {
    try {
      const finduser = await User.findOne({
        "basicInformation.email": email,
        "basicInformation.isBlocked": false,
      });

      if (finduser) {
        return { status: true, finduser };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log("error in finduser", error);
    }
  },
  getAllUsers: async () => {
    try {
      let userData: any[] = [];
      const users = await User.find({ "basicInformation.isBlocked": false });

      Promise.all(
        users.map(async (data: any) => {
          const user = {
            reciverId: data.basicInformation.userId,
            email: data.basicInformation.email,
            fullName: data.basicInformation.fullName,
            profilePic: data.profile.profileUrl,
            username: data.basicInformation.username,
          };
          userData.push(user);
        })
      );

      if (users) {
        return { status: true, data: userData };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log("error in getallusers", error);
    }
  },
  getUsersByName: async (fullName: string) => {
    try {
      if (fullName.trim() !== "") {
        const users = await User.find({
          "basicInformation.fullName": {
            $regex: "^" + fullName,
            $options: "i",
          },
        });

        if (users.length > 0) {
          return { status: true, data: users };
        } else {
          return { status: false };
        }
      } else {
        console.log("what manhhh");
        return { status: false };
      }
    } catch (error) {
      console.log("error in get users by name", error);
    }
  },
  getUserById: async (id: any) => {
    try {
      const user = await User.findOne({ _id: id });

      if (user) {
        return {
          status: true,
          data: user,
        };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log("error in get user by id", error);
    }
  },
  addProfile: async (data: any, id: string) => {
    try {
      const response = await User.findOneAndUpdate(
        { "basicInformation.userId": id },
        {
          $set: {
            "basicInformation.userName": data.username,
            "basicInformation.phone": data.phone,
            "basicInformation.dateOfBirth": data.dob,
            "basicInformation.gender": data.gender,
            "profile.bio": data.bio,
          },
        },
        { new: true }
      );

      if (response) {
        return {
          status: true,
          message: "Profile Created Successfully",
          user: response,
        };
      } else {
        return { status: false, message: "user creation failed" };
      }
    } catch (error) {
      console.log("error in add profile", error);
    }
  },
  editUserProfile: async (data: any, id: string) => {
    try {
      type DataObject = { [key: string]: [string, string] };

      const response = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "basicInformation.username": data.username,
            "basicInformation.fullname": data.fullname,
            "basicInformation.phone": data.phone,
            "profile.Bio": data.bio,
          },
        },
        { new: true }
      );

      if (response) {
        return {
          status: true,
          message: "Profile Updated successfully",
          user: response,
        };
      } else {
        return {
          status: false,
          message: "edit failed",
          user: false,
        };
      }
    } catch (error) {
      console.log("error in edit user profile", error);
    }
  },
  addprofileImage: async (imageUrl: string, userId: string) => {
    const response = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "profile.profileUrl": imageUrl,
        },
      },
      { new: true }
    );
    console.log("response of add profile image", response);
    if (response) {
      return {
        status: true,
        message: "add image success",
        data: response,
      };
    } else {
      return { status: false, message: "add image failed" };
    }
  },
  getSearchUsers: async (regex: string) => {
    console.log("userrrr", regex);

    const userData = await User.find({
      $or: [
        {
          "basicInformation.email": {
            $regex: ".*" + regex + ".*",
            $options: "i",
          },
        },
        {
          "basicInformation.username": {
            $regex: ".*" + regex + ".*",
            $options: "i",
          },
        },
      ],
    });

    if (userData) {
      return { status: true, message: "users found", data: userData };
    }
  },
  // Adjust the import based on your project structure

  followUser: async (currentUserId: string, followedUserId: string) => {
    try {
      const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
      const followedUserObjectId = new mongoose.Types.ObjectId(followedUserId);

      const user: any = await User.findById(currentUserObjectId);
      if (!user) {
        return { status: false, message: "Current user not found" };
      }

      const userAlreadyFollows = user.socialConnections.Following.some(
        (connection: any) => connection.equals(followedUserObjectId)
      );

      if (userAlreadyFollows) {
        const updatedUser = await User.findByIdAndUpdate(
          currentUserObjectId,
          { $pull: { "socialConnections.Following": followedUserObjectId } },
          { new: true }
        );

        const updatedFollowedUser = await User.findByIdAndUpdate(
          followedUserObjectId,
          { $pull: { "socialConnections.Followers": currentUserObjectId } },
          { new: true }
        );

        if (updatedUser && updatedFollowedUser) {
          return { status: true, message: "Unfollowed successfully" };
        } else {
          return { status: false, message: "Failed to unfollow" };
        }
      } else {
        const userDetails: any = await User.findById(followedUserObjectId);
        if (!userDetails) {
          return { status: false, message: "Followed user not found" };
        }

        const updatedUser = await User.findByIdAndUpdate(
          currentUserObjectId,
          {
            $addToSet: { "socialConnections.Following": followedUserObjectId },
          },
          { new: true }
        );

        const updatedFollowedUser = await User.findByIdAndUpdate(
          followedUserObjectId,
          { $addToSet: { "socialConnections.Followers": currentUserObjectId } },
          { new: true }
        );

        if (updatedUser && updatedFollowedUser) {
          return { status: true, message: "Followed successfully" };
        } else {
          return { status: false, message: "Failed to follow" };
        }
      }
    } catch (error) {
      console.error(
        "An error occurred while updating the follow status:",
        error
      );
      return { status: false, message: "An error occurred" };
    }
  },

  blockUser: async (userId: any, userToBlockId: any) => {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const blockId = new mongoose.Types.ObjectId(userToBlockId);
      const user = await User.findById(userObjectId);
      const userToBlock = await User.findById(blockId);
      if (!user || !userToBlock) {
        throw new Error("User or user to block not found");
      }
      if (user.socialConnections?.blockedUsers.includes(userToBlockId)) {
        throw new Error("This user is already blocked");
      }
      user?.socialConnections?.blockedUsers.push(userToBlockId);
      await user.save();

      return { status: true, message: "user blocked successfully" };
    } catch (error) {
      console.log("error in blocking user", error);
      return { status: false, message: "error in server" };
    }
  },
  unblockUser: async (userId: any, userToUnblockId: any) => {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const blockId = new mongoose.Types.ObjectId(userToUnblockId);

      const user = await User.findById(userObjectId);

      if (!user) {
        0;
        throw new Error("User not found");
      }
      const index =
        user.socialConnections!.blockedUsers.indexOf(userToUnblockId);
      if (index === -1) {
        throw new Error("user is not blocked");
      }
      user.socialConnections?.blockedUsers.splice(index, 1);
      await user.save();

      return { status: true, message: "user ublocked successfully" };
    } catch (error) {
      console.log("error in unblocking user", error);
      return { status: false, message: "error in server" };
    }
  },
  savePost: async (data: any) => {
    try {
      console.log("data for saving post", data);

      const { userId, postId } = data;

      const user: any = await User.findById(data.userId);
      if (user) {
        if (!user.activity.saved.includes(postId)) {
          user.activity.saved.push(postId);
        } else {
          const index = user.activity.saved.indexOf(postId);
          if (index !== -1) {
            user.activity.saved.splice(index, 1);
          }
        }
        const response = await user.save();
        if (response) {
          return { status: true, data: response };
        } else {
          return { status: false, message: "Error while saving post" };
        }
      } else {
        return { status: false, message: "User not found" };
      }
    } catch (error) {
      console.log("error in saving post", error);
    }
  },
  findAllUsersExcept: async (userId: string) => {
    try {
      const users = await User.find({ _id: { $ne: userId } });

      if (users) {
        return { status: true, data: users, message: "users found" };
      }
    } catch (error) {
      console.log("error finding users", error);
      return { status: false, message: "users not found" };
    }
  },
  getCreatedPosts: async (userId: string) => {
    try {
      const posts = await Post.find({ createdBy: { $eq: userId } });
      if (posts) {
        return { status: true, data: posts, message: "posts found" };
      }
    } catch (error) {
      console.log("error finding posts", error);
      return { status: false, message: "post not found" };
    }
  },
  getSuggestedProfile: async (userId: string) => {
    try {
      const user = await User.findOne({ _id: userId });

      if (user) {
        const following = user.socialConnections?.Following || [];

        const suggestedUsers = await User.find({
          _id: { $nin: [...following, userId] },
          "basicInformation.isBlocked": false,
        });

        return {
          status: true,
          message: "suggeste users",
          data: suggestedUsers,
        };
      } else {
        return { status: false, message: "users not found" };
      }
    } catch (error) {
      console.log("error in getting suggested users", error);
      return { status: false, message: "internal server error" };
    }
  },
  getMonthlyUsersCount: async () => {
    try {
      const usersPerMonth = await User.aggregate([
        {
          $group: {
            _id: { $month: "$basicInformation.createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      const resultArray = usersPerMonth.map((item) => ({
        x: item._id,
        y: item.count,
      }));
      if (usersPerMonth) {
        return {
          status: true,
          message: "count successfull",
          usersPerMonth: resultArray,
        };
      }
    } catch (error) {
      console.log("error in getting monthly users count", error);
      return { status: false, message: "count successfull   " };
    }
  },
  changeUserStatus: async (userId: string) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log("user not found");
        return;
      }
      if (!user.basicInformation) {
        console.log("User's basic information is missing");
        return {
          status: false,
          message: "User's basic information is missing",
        };
      }

      user.basicInformation.isBlocked = !user.basicInformation.isBlocked;
      await user.save();
      if (user) {
        return { status: true, message: "user status changed" };
      } else {
        return { status: false, message: "error in cahnging user status" };
      }
    } catch (error) {
      console.log("error in cahnging user status", error);
      return { status: false, message: "internal server error" };
    }
  },
  getFollowers: async (userId: string) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (user) {
        const followers = user?.socialConnections?.Followers || [];
        const data = await User.find({
          _id: { $in: [...followers] },
        });

        return { status: true, message: "the followers", data: data };
      } else {
        return { status: false, message: "followers not found" };
      }
    } catch (error) {
      console.log("error in getting followers", error);
      return { status: false, message: "internal server error" };
    }
  },
  getFollowing: async (userId: string) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (user) {
        const following = user.socialConnections?.Following || [];
        const data = await User.find({
          _id: { $in: [...following] },
        });

        return { status: true, message: "the following", data: data };
      } else {
        return { status: false, message: "followings not found" };
      }
    } catch (error) {
      console.log("error in getting followings", error);
      return { status: false, message: "internal server error" };
    }
  },
};
