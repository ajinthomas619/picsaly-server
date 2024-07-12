export const addProfileImageUsecase = (dependencies: any) => {
  try {
    const {
      repository: { userRepository },
    } = dependencies;
    const executeFunction = async (profileImageUrl: any, userId: string) => {
      const response = await userRepository.addprofileImage(
        profileImageUrl,
        userId
      );

      if (response) {
        return {
          status: response?.status,
          message: response?.message,
          data: response?.data,
        };
      } else {
        return { status: false, message: "add profile image error" };
      }
    };
    return { executeFunction };
  } catch (error) {
    console.log("error inn addProfileImageUsecase", error);
  }
};
