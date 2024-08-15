import generateSlots from "../../helpers/generateSlots";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotFormDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;
  const slotDuration = 60;

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
  const result = await Slot.find({});
  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId } = query;
  const filter: any = { isBooked: false };
  if (date) {
    filter.date = date;
  }
  if (roomId) {
    filter.room = roomId;
  }

  const result = await Slot.find(filter).populate("room");

  return result;
};

export const SlotService = {
  createSlotFormDB,
  getAllSlotsFromDB,
  getAvailableSlotsFromDB,
};
