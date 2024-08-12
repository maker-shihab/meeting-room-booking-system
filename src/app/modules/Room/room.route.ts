import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomController } from "./room.controller";
import { RoomValidation } from "./room.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(RoomValidation.roomValidationSchema),
  RoomController.createRoom,
);

router.get("/", RoomController.getAllRooms);

export const RoomRouter = router;
