import { Request, Response } from "express";

export default (dependencies: any) => {

  const { useCase: {getUserByIdUse_Case} } = dependencies;

  const getUserByIdController = async (req: Request, res: Response) => {
    try {
      console.log("hi userid");

      const id = req.body.id;
      console.log("idd", id);
      const response = await getUserByIdUse_Case(dependencies).executeFunction(id);
      console.log("resxponseee", response);
      if (response.status) {
        res.status(200).json({ status: true, data: response.data });
      } else {
        res.status(404).json({ status: false });
      }
    } catch (error) {
      console.log("error in getuserbyid controller", error);
    }
  };
  return getUserByIdController;
};
