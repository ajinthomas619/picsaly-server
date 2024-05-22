import { Request, Response } from "express";
import { CommentObject } from "../../../utils/interface/interface";

export default (dependencies: any) => {
  const {
    useCase: { addComment_useCase },
  } = dependencies;
  const addCommentController = async (req: Request, res: Response) => {
    try {
      const postId = req.body.postId;
      const { userId, name: username, comment: text } = req.body;

      const comment = {
        userId,
        username,
        text,
        createdAt: new Date(Date.now()),
        profile: "",
      };

      const response = await addComment_useCase(dependencies).executeFunction(
        postId,
        comment
      );

      if (response.status) {
        res
          .status(201)
          .json({
            status: true,
            message: "comment added",
            comment: response.comment,
          });
      } else {
        res.status(500).json({ status: false, message: "comment not added" });
      }
    } catch (error) {
      console.log("errror in add comment controlller", error);
    }
  };
  return addCommentController;
};
