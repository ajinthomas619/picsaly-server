export const addProfileUsecase = (dependencies: any) => {
  try {
    const {
      repository: { userRepository },
    } = dependencies;
    const executeFunction = async (data: any, id: string) => {
      const response = await userRepository.addProfile(data, id);

      if (response) {
        return {
          status: response.status,
          message: response.message,
          user: response.user,
        };
      } else {
        return { satus: false, message: "response not found" };
      }
    };
    return { executeFunction };
  } catch (error) {
    console.log("error in addprofile usecase", error);
  }
};
