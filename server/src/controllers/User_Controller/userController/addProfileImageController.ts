import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt/jwt";

export default (dependencies: any) => {
  const {
    useCase: { addProfileImageUsecase },
  } = dependencies;
  const AddProfileImageController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
    console.log("id for add image",id)
      const imageUrl = req?.file?.filename;
      const response = await addProfileImageUsecase(
        dependencies
      ).executeFunction(imageUrl, id);
      if (response) {
        res.json({
          status: response.status,
          message: response.message,
          data: response?.data,
        });
      } else {
        res.json({ status: response.status, message: response.message });
      }
    } catch (error) {
      console.log("error in AddProfileImageController", error);
    }
  };
  return AddProfileImageController;
};
