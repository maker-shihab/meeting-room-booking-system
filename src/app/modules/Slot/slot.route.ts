import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { SlotController } from "./slot.controller";
import { SlotValidation } from "./slot.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.slotValidationSchema),
  SlotController.createSlot,
);

router.get("/availability", SlotController.getAvailableSlots);

export const SlotRouter = router;
