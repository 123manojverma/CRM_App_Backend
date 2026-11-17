import jwt from "jsonwebtoken";
import { serverConfig } from "../config/server.config.js";

export function generateJWT(obj:any){
    return jwt.sign(obj,serverConfig.JWT_SECRET,{expiresIn:'1h'});
}