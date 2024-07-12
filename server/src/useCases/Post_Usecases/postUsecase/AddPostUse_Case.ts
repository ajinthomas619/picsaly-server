import { PostData } from "../../../utils/interface/interface";

export const AddPost_Usecase = (dependencies: any) => {
  const {
    repository: { postRepository },
  } = dependencies;
  const executeFunction = async (data: PostData) => {
    const response = await postRepository?.createPost(data);
    console.log("heyyy", response);
    if (response.status) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: "post creation failed" };
    }
  };
  return { executeFunction };
};
