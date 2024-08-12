import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../User/user.mode";
import { ILoginUser, ILoginUserResonse } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResonse> => {
  const { email, password } = payload;

  const isUserEsist = await User.isUserExist(email);

  if (!isUserEsist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserEsist.password &&
    !(await User.isPasswordMatched(password, isUserEsist.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    email: isUserEsist.email,
    role: isUserEsist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });
  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
};
