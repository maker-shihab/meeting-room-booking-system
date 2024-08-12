import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: "admin" | "user";
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
