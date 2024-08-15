import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Meeting Room Booking System 💥");
});

// Router for main api
app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
