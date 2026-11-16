import type { User } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

class UserRepository{
    async create(){

    }

    async get(userId:string):Promise<User | null>{
        const user=await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        return user; 
    }

    async getAll():Promise<User[]>{
        const users=await prisma.user.findMany();
        return users;
    }

    async delete(){

    }

    async update(){

    }
}

export default UserRepository;