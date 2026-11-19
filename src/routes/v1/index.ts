import { Router } from "express";
import userRouter from "./user.route.js";
import ticketRouter from "./ticket.route.js";

const v1Router:Router=Router();

v1Router.use('/users',userRouter);
v1Router.use('/tickets',ticketRouter);

export default v1Router;