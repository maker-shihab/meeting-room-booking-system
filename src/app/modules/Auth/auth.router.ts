import express from "express";
import { UserController } from "../User/user.controller";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", AuthController.loginUser);

export const AuthRouter = router;
