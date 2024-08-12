import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotFormDB = async (payload: TSlot) => {
  const result = await Slot.create(payload);
  return result;
};

const getAllSlotsFromDB = async () => {
  const result = await Slot.find({});
  return result;
};

export const SlotService = {
  createSlotFormDB,
  getAllSlotsFromDB,
};
