import { IUser, UserModel } from "@/database/models/user.model";
import { hashPassword } from "@/utils/auth";

export const getUserByEmail = async (email: string) => await UserModel.findOne({ email });

export const createUser = async (data: IUser) => {
  const newUser = new UserModel(data);
  await newUser.save();
}

export const updatePassword = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  user.password = await hashPassword(password);
  await user.save();
}
