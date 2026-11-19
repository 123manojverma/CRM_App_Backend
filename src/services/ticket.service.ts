import type CreateTicketDto from "../dtos/createTicket.dto.js";
import NotFoundError from "../errors/notFound.js";
import type { Ticket, User } from "../generated/prisma/client.js";
import type TicketRepository from "../repositories/ticket.repository.js";
import type UserRepository from "../repositories/user.repository.js";

export default class TicketService{
    private ticketRepository:TicketRepository;
    private userRepository:UserRepository;

    constructor(ticketRepository:TicketRepository,userRepository:UserRepository){
        this.ticketRepository=ticketRepository;
        this.userRepository=userRepository;
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
            ticket=await this.ticketRepository.update(ticket.id,{createdBy:createdBy.email,assignedTo:engineer.id});
            return ticket;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getEngineerToAllocateTicket():Promise<User>{
        try {
            const engineers=await this.userRepository.getEngineers();
            engineers.sort((engineer1,engineer2)=>engineer1.ticketsAssigned.length-engineer2.ticketsAssigned.length);
            const engineer=engineers[0];
            if(!engineer){
                throw new Error("No engineers are available to allocate the ticket");
            }
            return engineer;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}