import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.get("/", auth(USER_ROLE.user), BookingController.getMyBooking);

export const MyBookingRoute = router;
