import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/signup", UserController.createUser);
// router.get("/", UserController.getAllUsers);
// router.get("/", UserController.getSingleUser);
// router.patch("/", UserController.updateUser);
// router.delete("/", UserController.deleteUser);

export const UserRouter = router;
