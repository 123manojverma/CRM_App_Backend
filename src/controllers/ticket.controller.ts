import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import GenericError from "../errors/genericError.js";
import { unknownErrorResponse } from "../utils/response.utils.js";
import TicketService from "../services/ticket.service.js";
import TicketRepository from "../repositories/ticket.repository.js";
import type { RequestWithUser } from "../types/RequestWithUser.js";
import UserRepository from "../repositories/user.repository.js";

const ticketService: TicketService = new TicketService(new TicketRepository(),new UserRepository());
const createTicket = async (req: Request, res: Response) => {
    try {
        const user=(req as RequestWithUser).user;
        const response = await ticketService.createTicket(req.body,user.id);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully created the ticket',
            data: response,
            err: {},
            success: true
        })
    } catch (error) {
        if (error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse)
    }
}

const updateTicket = async (req: Request, res: Response) => {
    try {
        const user=(req as RequestWithUser).user;
        const response = await ticketService.updateTicket(req.params.id,req.body,user.email);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully updated the ticket',
            data: response,
            err: {},
            success: true
        })
    } catch (error) {
        if (error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse)
    }
}

export default {
    createTicket,
    updateTicket
}