import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import NoDataFoundError from "../../errors/NoDataFoundError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomFromDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  if (result.length === 0) {
    throw new NoDataFoundError();
  }
  return result;
};

const getSingleRoomFromDb = async (id: string) => {
  const result = await Room.findOne({ _id: id, isDeleted: false });
  if (!result) {
    throw new NoDataFoundError();
  }
  return result;
};

const updateRoomFromDB = async (id: string, payload: Partial<TRoom>) => {
  const checkRoom = await Room.findById({ _id: id });
  if (!checkRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  const result = await Room.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const checkRoom = await Room.findById({ _id: id });

  if (!checkRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }
  if (checkRoom.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Room already deleted");
  }

  const result = await Room.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const RoomService = {
  createRoomFromDB,
  getAllRoomsFromDB,
  getSingleRoomFromDb,
  updateRoomFromDB,
  deleteRoomFromDB,
};
