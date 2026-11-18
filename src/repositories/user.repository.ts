import type CreateUserDto from "../dtos/createUser.dto.js";
import type { User } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

class UserRepository{
    async create(userDetails:CreateUserDto):Promise<User>{
        const user=await prisma.user.create({
            data:{
                name:userDetails.name,
                email:userDetails.email,
                password:userDetails.password
            }
        })
        return user;
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

    async getUserByEmail(userEmail:string):Promise<User | null>{
        const user=await prisma.user.findUnique({
            where:{
                email:userEmail
            }
        })
        return user;
    }
}

export default UserRepository;