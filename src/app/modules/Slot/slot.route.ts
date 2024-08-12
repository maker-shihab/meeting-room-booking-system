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

router.get("/", SlotController.getAllSlots);

export const SlotRouter = router;
