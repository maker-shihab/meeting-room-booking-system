import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: "admin" | "user";
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
