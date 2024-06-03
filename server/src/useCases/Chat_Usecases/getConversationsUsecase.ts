export const getConversationsUsecase = (dependencies: any) => {
  const {
    repository: { chatRepository },
  } = dependencies;

  const executeFunction = async (following: string[], userId: string) => {
    try {
      const conversations = await chatRepository.getConversations(
        following,
        userId
      );

      const participantsArray = conversations.participantsArray;

      if (conversations.status) {
        return {
          status: true,
          message: conversations.message,
          conversations: participantsArray,
        };
      } else {
        return { conversations };
      }
    } catch (error) {
      console.log("error in getConversation usecase", error);
      return { status: false, message: "error in get conversation usecase" };
    }
  };
  return { executeFunction };
};
