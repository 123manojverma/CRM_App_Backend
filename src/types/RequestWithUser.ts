import type { Request } from "express";
import type JwtDecodedUser from "./JwtDecodedUser.js";

export interface RequestWithUser extends Request {
    user: JwtDecodedUser;
}