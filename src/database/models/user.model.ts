import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string,
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide data"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Provide data"]
  },
  password: {
    type: String,
    required: [true, "Provide data"]
  }
});

export const UserModel = mongoose.models.users || mongoose.model<IUser>("users", userSchema);
