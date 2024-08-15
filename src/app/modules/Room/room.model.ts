import { model, Schema } from "mongoose";
import { TRoom } from "./room.interface";

const roomSchema = new Schema<TRoom>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  roomNo: {
    type: Number,
    required: [true, "Room number is required"],
  },
  floorNo: {
    type: Number,
    required: [true, "Floor number is required"], // Added this field
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
  },
  pricePerSlot: {
    type: Number,
    required: [true, "Price per slot is required"],
  },
  amenities: {
    type: [String],
    required: [true, "Amendment is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Room = model<TRoom>("Room", roomSchema);
