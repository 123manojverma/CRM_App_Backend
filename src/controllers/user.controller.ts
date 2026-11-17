import type { Request, Response } from "express";
import UserService from "../services/user.service.js";
import UserRepository from "../repositories/user.repository.js";
import { StatusCodes } from "http-status-codes";
import GenericError from "../errors/genericError.js";
import { unknownErrorResponse } from "../utils/response.utils.js";

const userService: UserService = new UserService(new UserRepository());
const getUser = async (req: Request, res: Response) => {
    try {
        const response = await userService.get(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully fetched the user',
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

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const response = await userService.getAll();
        return res.status(StatusCodes.OK).json({
            message: 'Successfully fetched the users',
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

const createUser = async (req: Request, res: Response) => {
    try {
        const response = await userService.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            message: 'Successfully created the user',
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

const signinUser = async (req: Request, res: Response) => {
    try {
        const response = await userService.signIn(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully signin the user',
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
    getUser,
    getAllUsers,
    createUser,
    signinUser
}