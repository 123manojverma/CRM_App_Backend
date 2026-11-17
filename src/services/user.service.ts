import { serverConfig } from "../config/server.config.js";
import type CreateUserDto from "../dtos/createUser.dto.js";
import type SignInDto from "../dtos/signin.dto.js";
import type { User } from "../generated/prisma/client.js";
import type UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/auth.utils.js";
import NotFoundError from "../errors/notFound.js";
import UnauthorizedError from "../errors/unauthorizedError.js";

class UserService {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async get(id: string): Promise<User> {
        try {
            const response: User | null = await this.userRepository.get(id);
            if (!response) {
                throw { error: "Not found" }
            }
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const response: User[] = await this.userRepository.getAll();
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(userDetails:CreateUserDto):Promise<User>{
        try {
            const salt=bcrypt.genSaltSync(serverConfig.SALT_ROUNDS);
            userDetails.password=bcrypt.hashSync(userDetails.password,salt);
            const response: User = await this.userRepository.create(userDetails);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(signInDetail:SignInDto):Promise<string>{
        try {
            const user=await this.userRepository.getUserByEmail(signInDetail.email);
            if(!user){
                throw new NotFoundError('User','email',signInDetail.email);
            }
            const doesPasswordMatch=bcrypt.compareSync(signInDetail.password,user.password);
            if(!doesPasswordMatch){
                throw new UnauthorizedError();
            }
            const jwt=generateJWT({id:user.id,email:user.email,role:user.roles});
            return jwt;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserService;