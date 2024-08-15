import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  startTime: {
    type: String,
    required: [true, "Start Time is required"],
  },
  endTime: {
    type: String,
    required: [true, "End Time is required"],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

slotSchema.statics.isSlotByCustomId = async function (id: string) {
  return await Slot.findById(id);
};

export const Slot = model<TSlot>("Slot", slotSchema);
