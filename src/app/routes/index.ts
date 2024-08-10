import express from "express";
import { UserRouter } from "../modules/User/user.router";

const router = express.Router();

const moduleRouters = [
  {
    path: "/users",
    route: UserRouter,
  },
];

moduleRouters.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
