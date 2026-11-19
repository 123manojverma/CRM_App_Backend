import type CreateUserDto from "../dtos/createUser.dto.js";
import type { User } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

class UserRepository {
    async create(userDetails: CreateUserDto): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
            }
        })
        return user;
    }

    async get(userId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user;
    }

    async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    async delete() {

    }

    async addCreatedTicket(id: string, ticketId: string):Promise<User> {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                ticketsCreated: {
                    push: ticketId
                }
            }
        })
        return user;
    }

    async addAssignedTicket(id: string, ticketId: string):Promise<User> {
        const user = await prisma.user.update({
            where: {
                id,
                roles:{
                    has:"ENGINEER"
                }
            },
            data: {
                ticketsAssigned: {
                    push: ticketId
                }
            }
        })
        return user;
    }

    async getUserByEmail(userEmail: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        return user;
    }

    async getEngineers(): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: {
                roles: {
                    has: "ENGINEER"
                }
            }
        })
        return users;
    }
}

export default UserRepository;