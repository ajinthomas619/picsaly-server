import { Request, Response } from "express";
import dependencies from "../../../config/dependencies";

export default (dependencies: any) => {
  const {
    useCase: { followUser_Usecase },
  } = dependencies;

  const followUserController = async (req: Request, res: Response) => {
    const { currentUserId, followedUserId } = req.body;

    const response = await followUser_Usecase(dependencies).executeFunction(
      currentUserId,
      followedUserId
    );

    if (response.status) {
      res.status(200).json({ status: true, message: response.message });
    } else {
      res
        .status(400)
        .json({ status: false, message: "something error happened" });
    }
  };
  return followUserController;
};
