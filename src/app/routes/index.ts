import express from "express";
import { AuthRouter } from "../modules/Auth/auth.router";
import { BookingRouter } from "../modules/Booking/booking.router";
import { MyBookingRoute } from "../modules/Booking/my-booking-route";
import { RoomRouter } from "../modules/Room/room.route";
import { SlotRouter } from "../modules/Slot/slot.route";

const router = express.Router();

const moduleRouters = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/rooms",
    route: RoomRouter,
  },
  {
    path: "/slots",
    route: SlotRouter,
  },
  {
    path: "/bookings",
    route: BookingRouter,
  },
  {
    path: "/my-bookings",
    route: MyBookingRoute,
  },
];

moduleRouters.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
