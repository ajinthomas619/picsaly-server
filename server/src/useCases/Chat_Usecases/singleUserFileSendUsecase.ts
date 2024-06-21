export const singleUserFileSendUsecase = (dependencies: any) => {
  const {
    repository: { chatRepository },
  } = dependencies;

  const executeFunction = async (data: any) => {

    try{
    const response = await chatRepository.singleUserSendFile(
      data
    );
    console.log("the response is",response)
    if (response.status) {
      return { status: true, data: response.data.savedMessage };
    } else {
      return { status: false, message: response.message };
    }
  }
  catch(error){
    console.log("error in send file usecase",error)
  }
}
  return { executeFunction };
};
