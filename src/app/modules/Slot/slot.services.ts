import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import NoDataFoundError from "../../errors/NoDataFoundError";
import generateSlots from "../../helpers/generateSlots";
import { Room } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotFormDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;
  const slotDuration = 60;
  const checkRoom = await Room.findOne({ _id: room });
  if (!checkRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found!");
  }
  // Generate slots
  const slots = generateSlots(startTime, endTime, slotDuration);

  const result = await Slot.insertMany(
    slots.map(slot => ({
      room,
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
  );

  return result;
};

const getAllSlotsFromDB = async () => {
  const result = await Slot.find({ isBooked: false });
  if (result.length === 0) {
    throw new NoDataFoundError();
  }

  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId } = query;
  const filter: any = { isBooked: false };

  if (date) {
    filter.date = date;
  }
  if (roomId) {
    const roomExists = await Room.findById(roomId);
    if (!roomExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Room not found");
    }
    filter.room = roomId;
  }

  const result = await Slot.find(filter).populate("room");
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No available slots found");
  }

  if (result.length === 0) {
    throw new NoDataFoundError();
  }

  return result;
};

export const SlotService = {
  createSlotFormDB,
  getAllSlotsFromDB,
  getAvailableSlotsFromDB,
};
