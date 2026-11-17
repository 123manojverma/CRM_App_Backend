import { ReasonPhrases, StatusCodes } from "http-status-codes";
import GenericError from "./genericError.js";

export default class UnauthorizedError extends GenericError {
    constructor(message?: string | null) {
        const errorMessage: string = message?message:'Invalid login credentials, please try again with correct credentials';
        super(StatusCodes.UNAUTHORIZED,ReasonPhrases.UNAUTHORIZED,errorMessage,"UnauthorizedError");
    }
}