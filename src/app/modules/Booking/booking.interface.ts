import { Types } from "mongoose";

export type BookingStatus = "confirmed" | "unconfirmed" | "canceled";

export type TBooking = {
  _id?: Types.ObjectId;
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  date: string;
  totalAmount: number;
  isConfirmed: BookingStatus;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
