import type CreateTicketDto from "../dtos/createTicket.dto.js";
import type { Ticket } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

class TicketRepository{
    async create(ticketDetails:CreateTicketDto):Promise<Ticket>{
        const ticket=await prisma.ticket.create({
            data:{
                ...ticketDetails
            }
        })
        return ticket;
    }

    async get(ticketId:string):Promise<Ticket | null>{
        const ticket=await prisma.ticket.findUnique({
            where:{
                id:ticketId
            }
        })
        return ticket; 
    }

    async getAll():Promise<Ticket[]>{
        const tickets=await prisma.ticket.findMany();
        return tickets;
    }

    async delete(){

    }

    async update(){

    }
}

export default TicketRepository;