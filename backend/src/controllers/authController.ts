import express from "express";
import { userSchema } from "../schema/user.schema";
import z from "zod";
import { sendError } from "../utils/sendError";
import { Status } from "../schema/status.schema";
import { sendResponse } from "../utils/sendResponse";
import { prismaClient } from "../services/prismaClient.service";
import { pushUserToDb } from "../services/user.service";

export async function signUpHandler(req: express.Request, res: express.Response ){
    const user = userSchema.safeParse({ email:req.body.email, password:req.body.password });
    if( !user.success )
        return sendError( res , Status.BAD_REQUEST , "ValidationError", z.prettifyError(user.error));
    try{
        const newUser  =  await pushUserToDb({ email: user.data.email, password: user.data.password });
        return sendResponse( res, Status.CREATED , "User created" , {success: true, user:newUser});

    }
    catch( err )
    {
        return sendError( res, Status.BAD_REQUEST , "Servic Violation Error", err);
    }

}


export function loginHandler( req: express.Request , res: express.Response)
{
    const user  =  userSchema.safeParse({ email:req.body.email, password:req.body.password });
    if( !user.success )
        return sendError ( res, Status.BAD_REQUEST, "ValidationError", z.prettifyError(user.error));
    const userExist = false // search in db
    if(userExist)
        return sendError( res, Status.BAD_REQUEST , "Servic Violation Error", "User already exist");
    else
        sendResponse( res, Status.OK  , "Successfully loggedIn" , "randomtoken");
}