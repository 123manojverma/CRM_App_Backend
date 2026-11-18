import jwt, { type JwtPayload } from "jsonwebtoken";
import { serverConfig } from "../config/server.config.js";
import type JwtDecodedUser from "../types/JwtDecodedUser.js";

export function generateJWT(obj: any) {
    return jwt.sign(obj, serverConfig.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): JwtDecodedUser {
    const response = jwt.verify(token, serverConfig.JWT_SECRET);
    return (response as JwtDecodedUser);
}