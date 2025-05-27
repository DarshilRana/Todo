import { Schema, model, Types } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser {
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
  generateAuthToken(): Promise<string>;
}
// export interface IUserDocument extends IUser {
//   generateAuthToken(): Promise<string>;
// }
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  try {
    const secretKey = "mynameisdarshilranaistheworldisfirstprintedinprogramwhen";
    const token = jwt.sign({ id: this._id }, secretKey, { expiresIn: "12h" });

    return token;
  } catch (error) {
    console.error("error while processing generateAuthToken() \n", error);
    throw error;
  }
};

export const UserModel = model<IUser>("User", userSchema);
