import { Request, Response, response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { addUser_useCase },
  } = dependencies;
  const addUser = async (req: Request, res: Response) => {
    const { username, name, email, password, mobile } = req.body;
    const data = {
      username: username,
      fullname: name,
      email: email,
      mobile: mobile,
      password: password,
    };

    if (!username || !name || !email || !password || !mobile) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await addUser_useCase(dependencies).executeFunction({
      username,
      name,
      email,
      mobile,
      password,
    });

    if (user?.status) {
      const { data, otp } = user;
      req.session.userData = data;

      req.session.otp = otp;
      console.log("otp===", otp);
      res.json({
        status: true,
        data: data,
      });
    } else {
      console.log(user.message);
      res.json({ status: false, message: user?.message });
    }
  };
  return addUser;
};
