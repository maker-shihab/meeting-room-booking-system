import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../../config";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const userExists = await User.isUserExist(email);
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    userExists.password &&
    !(await User.isPasswordMatched(password, userExists.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    email: userExists.email,
    role: userExists.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  let userData = await User.findOne({ email });

  return {
    token: `Bearer ${accessToken}`,
    userData,
  };
};

export const AuthService = {
  loginUser,
};
