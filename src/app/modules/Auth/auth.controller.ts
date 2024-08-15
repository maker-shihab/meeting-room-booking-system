import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);
  const { token, userData } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: token,
    data: userData,
  });
});

export const AuthController = {
  loginUser,
};
