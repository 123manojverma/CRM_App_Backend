import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "../generated/prisma/enums.js";

export default class UpdateTicketDto {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    ticketPriority:number;

    @IsEnum(Status)
    @IsOptional()
    status:string;

    @IsString()
    @IsEmail()
    @IsOptional()
    assignedTo:string;

    @IsString()
    @IsEmail()
    @IsOptional()
    createdBy:string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    clientName: string;
}