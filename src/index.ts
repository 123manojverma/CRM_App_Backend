import express, {type Application, type Request, type Response } from "express";
import { serverConfig } from "./config/server.config";

const app:Application=express();

app.get('/ping',(req:Request,res:Response)=>{
    return res.json({
        message:"Ping OK"
    })
})

app.listen(serverConfig.PORT,()=>{
    console.log("Server started successfully on port",serverConfig.PORT);
})