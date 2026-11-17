import dotenv from "dotenv";

dotenv.config();

interface IserveConfig{
    PORT:number,
    SALT_ROUNDS:number
}

export const serverConfig:IserveConfig={
    PORT:Number(process.env.PORT),
    SALT_ROUNDS:Number(process.env.SALT_ROUNDS)
}