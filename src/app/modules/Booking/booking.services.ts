import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({});
  return result;
};

const getMyBookingIntoDB = async (id: string) => {
  const result = await Booking.find({ id });
  return result;
};

export const BookingService = {
  createBooking,
  getAllBookingsFromDB,
  getMyBookingIntoDB,
};
