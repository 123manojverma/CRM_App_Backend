import 'dotenv/config';
import express, {type Application, type Request, type Response } from "express";
import { serverConfig } from "./config/server.config";
import { prisma } from "./lib/prisma.js";

const app:Application=express();

app.get('/ping',(req:Request,res:Response)=>{
    return res.json({
        message:"Ping OK"
    })
})

app.listen(serverConfig.PORT,async()=>{
    console.log("Server started successfully on port",serverConfig.PORT);
    const user=await prisma.user.findMany();
    console.log(user);
})