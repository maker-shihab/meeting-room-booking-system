import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { BookingController } from "./booking.controller";
import { BookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingController.createBooking,
);

router.get("/", auth(USER_ROLE.admin), BookingController.getAllBookings);

router.get("/:id", auth(USER_ROLE.user), BookingController.getMyBooking);

router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(BookingValidation.updateBookingValidationSchema),
  BookingController.deleteBooking,
);

router.put("/:id", auth(USER_ROLE.admin), BookingController.updateBooking);

export const BookingRouter = router;
