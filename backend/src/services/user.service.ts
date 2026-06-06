import { prismaClient } from "./prismaClient.service";
import type { User } from "../schema/user.schema";
import { hashPassword } from "../utils/hash";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";


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
    
    
export async function verifyUser( claimedUser : User)
{
    const storedUser = await prismaClient.user.findUnique({
        where:{
            email: claimedUser.email,
        }
    }) 
    if(!storedUser)
        throw new AppError("User not found");
    const ifVerified =  await bcrypt.compare( claimedUser.password , storedUser.password);
    if(!ifVerified)
        throw new AppError("Invalid Password");
    return storedUser.id;

}
