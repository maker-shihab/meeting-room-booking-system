import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import AppError from "../../errors/AppError";
import { Room } from "../Room/room.model";
import { Slot } from "../Slot/slot.model";
import { User } from "../User/user.model";
import { BookingStatus, TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: TBooking) => {
  const { room, slots, user, date, isDeleted, _id } = payload;

  const getUser = await User.findById(user);
  if (!getUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const checkRoom = await Room.findById(room);
  if (!checkRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found!");
  }

  const checkRoomDeleted = await Room.findById(room, { isDeleted: true });
  if (!checkRoomDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Room already deleted!");
  }

  // About Slots
  const checkSlots = await Promise.all(
    slots.map(slotId => Slot.findById(slotId)),
  );
  for (const slot of checkSlots) {
    if (!slot) {
      throw new Error(`Slot not found.`);
    }
    if (slot.isBooked) {
      throw new Error(`Slot with ID ${slot._id} is already booked.`);
    }
  }
  await Promise.all(
    slots.map(slotId => Slot.findByIdAndUpdate(slotId, { isBooked: true })),
  );

  // Calculate total Amount in selected slots
  const totalAmount = slots.length * checkRoom.pricePerSlot;
  const isConfirmed: BookingStatus = "confirmed";

  const newBooking = new Booking({
    _id,
    date,
    slots,
    room,
    user,
    totalAmount,
    isConfirmed,
    isDeleted,
  });

  await Booking.create(newBooking);

  const populateBooking = await Booking.findById(newBooking._id)
    .populate({
      path: "slots",
      select: "-__v",
    })
    .populate({
      path: "user",
      select: "-password -__v -createdAt -updateAt",
    })
    .populate({
      path: "room",
      select: "-__v",
    });

  return populateBooking;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({})
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};

const getMyBookingIntoDB = async (token: string) => {
  const tokenCode = token.split(" ")[1];

  // Decode Token
  const decoded = jwt.verify(
    tokenCode,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;
  const result = await Booking.find({ user: userId })
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};

export const BookingService = {
  createBooking,
  getAllBookingsFromDB,
  getMyBookingIntoDB,
};
