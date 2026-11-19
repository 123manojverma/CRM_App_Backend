import { Router } from "express";
import ticketController from "../../controllers/ticket.controller.js";
import { isLoggedIn } from "../../validators/auth.validators.js";

const ticketRouter=Router();

ticketRouter.post('/',isLoggedIn,ticketController.createTicket);

export default ticketRouter;