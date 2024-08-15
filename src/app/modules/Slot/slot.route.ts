import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SlotController } from "./slot.controller";
import { SlotValidation } from "./slot.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(SlotValidation.slotValidationSchema),
  SlotController.createSlot,
);

router.get("/availability", SlotController.getAvailableSlots);

export const SlotRouter = router;
