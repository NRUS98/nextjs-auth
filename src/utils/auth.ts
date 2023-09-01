import bcryptjs from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt();
  return await bcryptjs.hash(password, salt);
};

