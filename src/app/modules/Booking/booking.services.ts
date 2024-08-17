import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import NoDataFoundError from "../../errors/NoDataFoundError";
import { Room } from "../Room/room.model";
import { Slot } from "../Slot/slot.model";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: TBooking) => {
  const { room, slots, user, date, isDeleted, _id } = payload;

  const getUser = await User.findById(user);
  if (!getUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const checkRoom = await Room.findById({ _id: room });
  console.log(checkRoom);
  if (!checkRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found!");
  }
  console.log(checkRoom);
  if (checkRoom.isDeleted) {
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

  const newBooking = new Booking({
    _id,
    date,
    slots,
    room,
    user,
    totalAmount,
    isDeleted,
  });

  await Booking.create(newBooking);

  const populateBooking = await Booking.findById(newBooking._id)
    .populate({
      path: "slots",
      select: "-__v",
    })
    .populate({
      path: "room",
      select: "-__v",
    })
    .populate({
      path: "user",
      select: "-password -__v -createdAt -updateAt",
    });

  return populateBooking;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({ isDeleted: false })
    .populate("slots")
    .populate("room")
    .populate("user");

  if (result.length === 0) {
    throw new NoDataFoundError();
  }
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
  const result = await Booking.find({ user: userId, isDeleted: false })
    .populate("slots")
    .populate("room");

  if (result.length === 0) {
    throw new NoDataFoundError();
  }
  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const getBooking = await Booking.findOne({ _id: id });
  if (!getBooking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBookingFromDB = async (id: string) => {
  const getBooking = await Booking.findOne({ _id: id });
  if (!getBooking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const BookingService = {
  createBooking,
  getAllBookingsFromDB,
  getMyBookingIntoDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
