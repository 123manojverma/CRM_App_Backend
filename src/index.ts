import express, {type Application, type Request, type Response } from "express";
import { serverConfig } from "./config/server.config";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app:Application=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api',apiRouter);

app.get('/ping',(req:Request,res:Response)=>{
    return res.json({
        message:"Ping OK"
    })
})

app.listen(serverConfig.PORT,async()=>{
    console.log("Server started successfully on port",serverConfig.PORT);
})