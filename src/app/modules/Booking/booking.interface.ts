import { Types } from "mongoose";

export type BookingStatus = "confirmed" | "unconfirmed" | "canceled";

export type TBooking = {
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  date: Date;
  totalAmount: number;
  isConfirmed: BookingStatus;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};
