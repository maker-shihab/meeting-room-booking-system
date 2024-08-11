import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  startTime: {
    type: Date,
    required: [true, "Start Time is required"],
  },
  endTime: {
    type: Date,
    required: [true, "End Time is required"],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

export const Slot = model<TSlot>("Slot", slotSchema);
