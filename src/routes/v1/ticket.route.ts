import { Router } from "express";
import ticketController from "../../controllers/ticket.controller.js";
import { isAdminOrEngineer, isLoggedIn } from "../../validators/auth.validators.js";
import { updateTicketValidator } from "../../validators/ticket.validator.js";

const ticketRouter=Router();

ticketRouter.post('/',isLoggedIn,ticketController.createTicket);
ticketRouter.patch('/:id',isLoggedIn,isAdminOrEngineer,updateTicketValidator,ticketController.updateTicket);

export default ticketRouter;