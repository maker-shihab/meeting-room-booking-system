import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { RoomController } from "./room.controller";
import { RoomValidation } from "./room.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.roomValidationSchema),
  RoomController.createRoom,
);

router.get("/", RoomController.getAllRooms);

router.get("/:id", RoomController.getSingleRoom);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.updateRoomValidationSchema),
  RoomController.updateRoom,
);

router.delete("/:id", auth(USER_ROLE.admin), RoomController.deleteRoom);

export const RoomRouter = router;
