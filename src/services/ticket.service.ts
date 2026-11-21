import type CreateTicketDto from "../dtos/createTicket.dto.js";
import type UpdateTicketDto from "../dtos/updateTicket.dto.js";
import BadRequestError from "../errors/badRequest.js";
import InternalServerError from "../errors/internalServerError.js";
import NotFoundError from "../errors/notFound.js";
import type { Prisma, Ticket, User } from "../generated/prisma/client.js";
import type TicketRepository from "../repositories/ticket.repository.js";
import type UserRepository from "../repositories/user.repository.js";
import type Engineer from "../types/engineer.js";

export default class TicketService{
    private ticketRepository:TicketRepository;
    private userRepository:UserRepository;

    constructor(ticketRepository:TicketRepository,userRepository:UserRepository){
        this.ticketRepository=ticketRepository;
        this.userRepository=userRepository;
    }

    async updateTicket(ticketId:string,ticketDetails:UpdateTicketDto,userEmail:string){
        try {
            const areWeUpdatingAssignedTo=ticketDetails.assignedTo!==undefined;
            /**
             * We want to make sure assignedTo always has an email of an admin or an engineer
             */
            if(areWeUpdatingAssignedTo){
                if(!(await this.userRepository.isUserAdmin(ticketDetails.assignedTo) || await this.userRepository.isUserEngineer(ticketDetails.assignedTo))){
                    throw new BadRequestError("assignedTo email is not a valid engineer or admin");
                }
            }
            const updateObject=areWeUpdatingAssignedTo?{...ticketDetails,updatedAt:new Date(),assignee:userEmail}:{...ticketDetails,updatedAt:new Date()};
            const ticket=await this.ticketRepository.update(ticketId,updateObject as Partial<Prisma.TicketUpdateInput>);
            return ticket;
        } catch (error) {
            if(error instanceof BadRequestError){
                throw error;
            }
            console.log(error);
            throw new InternalServerError();
        }
    }

    async createTicket(ticketDetails:CreateTicketDto,userId:string):Promise<Ticket> {
        try {
            let ticket=await this.ticketRepository.create(ticketDetails);
            const createdBy=await this.userRepository.get(userId);
            if(!createdBy){
                throw new NotFoundError("User","id",userId);
            }
            const engineer=await this.getEngineerToAllocateTicket();            
            createdBy.ticketsCreated.push(ticket.id);
            await this.userRepository.addAssignedTicket(engineer.id,ticket.id);
            await this.userRepository.addCreatedTicket(createdBy.id,ticket.id);
            ticket.createdBy=createdBy?.email;
            ticket=await this.ticketRepository.update(ticket.id,{createdBy:createdBy.email,assignedTo:engineer.email});
            return ticket;
        } catch (error) {
            if(error instanceof BadRequestError){
                throw error;
            }
            console.log(error);
            throw error;
        }
    }

    async getEngineerToAllocateTicket():Promise<Engineer>{
        try {
            // const engineers=await this.userRepository.getEngineers();
            // engineers.sort((engineer1,engineer2)=>engineer1.ticketsAssigned.length-engineer2.ticketsAssigned.length);
            // const engineer=engineers[0];
            // if(!engineer){
            //     throw new Error("No engineers are available to allocate the ticket");
            // }
            
            const engineer=await this.userRepository.getAvailableEngineer();
            return engineer;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}