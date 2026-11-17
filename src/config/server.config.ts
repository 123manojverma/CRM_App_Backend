import dotenv from "dotenv";

dotenv.config();

interface IserveConfig {
    PORT: number,
    SALT_ROUNDS: number,
    JWT_SECRET: string
}

export const serverConfig: IserveConfig = {
    PORT: Number(process.env.PORT),
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
    JWT_SECRET: process.env.JWT_SECRET || ""
}