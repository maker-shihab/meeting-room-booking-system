import express from "express";
import { RoomRouter } from "../modules/Room/room.route";
import { SlotRouter } from "../modules/Slot/slot.route";
import { UserRouter } from "../modules/User/user.router";

const router = express.Router();

const moduleRouters = [
  {
    path: "/auth",
    route: UserRouter,
  },
  {
    path: "/room",
    route: RoomRouter,
  },
  {
    path: "/slot",
    route: SlotRouter,
  },
];

moduleRouters.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
