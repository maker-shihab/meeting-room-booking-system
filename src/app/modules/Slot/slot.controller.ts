import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotService } from "./slot.services";

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotService.createSlotFormDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created successfully",
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotService.getAllSlotsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots retrieved successfully",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAllSlots,
};
