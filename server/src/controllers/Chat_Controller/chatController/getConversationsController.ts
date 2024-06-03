import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { getConversationsUsecase },
  } = dependencies;
  const getConversationConntroller = async (req: Request, res: Response) => {
    try {
      const { following } = req.body;
      const userId = req.params.userId;
  

      const conversations = await getConversationsUsecase(
        dependencies
      ).executeFunction(following, userId);
      if (conversations) {
        res.status(200).json(conversations.conversations);
      } else {
        res.status(400).json({ message: "No conversations found" });
      }
    } catch (error) {
      console.error("error in getConversationController", error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  return getConversationConntroller;
};
