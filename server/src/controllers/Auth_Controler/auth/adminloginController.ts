import { Request, Response } from "express";

export default (dependencies: any) => {
  const adminAuth = (req: Request, res: Response) => {
    try {
      const {
        useCase: { adminAuth_UseCase },
      } = dependencies;

      const response = adminAuth_UseCase().executeFunction(req.body);

      res.send(response).status(200);
    } catch (error) {
      console.log(error);
    }
  };
  return adminAuth;
};
