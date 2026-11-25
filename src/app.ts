import express, { type Application, type Request, type Response } from "express";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);

app.get("/ping", (_req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    message: "Ping OK",
  });
});

export default app;
