import dotenv from "dotenv";

dotenv.config();

interface IserveConfig{
    PORT:Number
}

export const serverConfig:IserveConfig={
    PORT:Number(process.env.PORT),
}