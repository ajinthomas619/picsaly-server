import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(password, salt);

    return hashedPass;
  } catch (error) {
    console.log(error, "Error in hashing password");
    throw new Error("Error in hashing password");
  }
};
export const comparePassword = async (password: string, hashedPass: string) => {
  try {
    let match = await bcrypt.compare(password, hashedPass);
    return match;
  } catch (error) {
    console.log(error, "Error comparing passwords");
    throw new Error("Error in verifiying passwords");
  }
};
