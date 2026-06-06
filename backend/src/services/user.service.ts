import { prismaClient } from "./prismaClient.service";
import type { User } from "../schema/user.schema";
import { hashPassword } from "../utils/hash";
import { AppError } from "../utils/appError";



export async function pushUserToDb ( user : User ) {
    
        const userExists  = await prismaClient.user.findUnique({
            where : {
                email: user.email,
            }
        })
        if(userExists)
            throw new AppError("User already exists")
        const createdUser  = await prismaClient.user.create({
            data: {
                email : user.email,
                password : await hashPassword(user.password),
            }
        })
        return {
            user : {
                id: createdUser.id,
                email: createdUser.email,
            }

        }
    
}
    
    
    
