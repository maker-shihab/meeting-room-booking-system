import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "../User/user.controller";
import { UserValidation } from "../User/user.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  UserController.createUser,
);

router.post("/login", AuthController.loginUser);

export const AuthRouter = router;
