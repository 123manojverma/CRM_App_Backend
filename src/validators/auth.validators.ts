import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UnauthorizedError from "../errors/unauthorizedError.js";
import { verifyToken } from "../utils/auth.utils.js";
import type { RequestWithUser } from "../types/RequestWithUser.js";
import type JwtDecodedUser from "../types/JwtDecodedUser.js";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers['x-access-token']) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorizedError(),
            data: {},
            success: false,
            message: "You're not a authorised to do this operation"
        })
    }
    const token: string = req.headers['x-access-token'].toString();
    let decodedToken: JwtDecodedUser;
    try {
        decodedToken = verifyToken(token);
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorizedError(),
            data: {},
            success: false,
            message: "You're not a authorised to do this operation"
        })
    }
    (req as RequestWithUser).user = decodedToken;
    next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const roles: string[] = (req as RequestWithUser).user.role;
        if (roles.find(role => role == 'ADMIN')) {
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                err: new UnauthorizedError(),
                data: {},
                success: false,
                message: "You're not a authorised to do this operation"
            })
        }
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorizedError(),
            data: {},
            success: false,
            message: "You're not a authorised to do this operation"
        })
    }
}

export function isEngineer(req: Request, res: Response, next: NextFunction) {
    try {
        const roles: string[] = (req as RequestWithUser).user.role;
        if (roles.find(role => role == 'ENGINEER')) {
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                err: new UnauthorizedError(),
                data: {},
                success: false,
                message: "You're not a authorised to do this operation"
            })
        }
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorizedError(),
            data: {},
            success: false,
            message: "You're not a authorised to do this operation"
        })
    }
}

export function isAdminOrEngineer(req: Request, res: Response, next: NextFunction) {
    try {
        const roles: string[] = (req as RequestWithUser).user.role;
        if (roles.find(role => role == 'ENGINEER' || role == 'ADMIN')) {
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                err: new UnauthorizedError(),
                data: {},
                success: false,
                message: "You're not a authorised to do this operation"
            })
        }
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorizedError(),
            data: {},
            success: false,
            message: "You're not a authorised to do this operation"
        })
    }
}