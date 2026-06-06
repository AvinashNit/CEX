import { prismaClient } from "./prismaClient.service";
import type { User } from "../schema/user.schema";
import { hashPassword } from "../utils/hash";



export async function pushUserToDb ( user : User ) {
    try{
        const createdUser  =  await prismaClient.user.create({
            data: {
                email: user.email,
                password: await hashPassword(user.password),
            }
        }
        )
        return {
            user : {
                id: createdUser.id,
                email: createdUser.email,
            }

        }
    }
    catch(err){
        throw err;
    }
}
    
    
    
