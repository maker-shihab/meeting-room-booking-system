import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomService } from "./room.services";

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomService.createRoomFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room created successfully",
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomService.getAllRoomsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

export const RoomController = {
  createRoom,
  getAllRooms,
};
