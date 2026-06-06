import express from "express";
import { userSchema } from "../schema/user.schema";
import z from "zod";
import { sendError } from "../utils/sendError";
import { Status } from "../schema/status.schema";
import { sendResponse } from "../utils/sendResponse";
import { prismaClient } from "../services/prismaClient.service";
import { pushUserToDb, verifyUser } from "../services/user.service";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/token.gen.verify";



export async function signUpHandler(req: express.Request, res: express.Response , next: express.NextFunction){
    const user = userSchema.safeParse({ email:req.body.email, password:req.body.password });
    if( !user.success )
         throw new AppError( z.prettifyError(user.error));
    try{
        const newUser  =  await pushUserToDb({ email: user.data.email, password: user.data.password });
        return sendResponse( res, Status.CREATED , "User created" , {success: true, user:newUser});

    }
    catch( err )
    {
         next(err);
    }

}


export async function loginHandler( req: express.Request , res: express.Response, next:express.NextFunction)
{
    const user  =  userSchema.safeParse({ email:req.body.email, password:req.body.password });
    if( !user.success )
         throw new AppError(z.prettifyError(user.error));
    try{
        const id = await verifyUser(user.data);
        const token = generateToken(id);
        return sendResponse( res, Status.OK, "User logged in successfully", {token});
        
        
    }
    catch(err)
    {
        next(err);
    }
}