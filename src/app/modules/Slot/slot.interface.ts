import { Model, Types } from "mongoose";

export type TSlot = {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export interface slotModel extends Model<TSlot> {
  isSlotByCustomId(id: Types.ObjectId): Promise<TSlot>;
}
