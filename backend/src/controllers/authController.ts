import express from "express";
import { userSchema } from "../schema/user.schema";
import z from "zod";
import { sendError } from "../utils/sendError";
import { Status } from "../schema/statusCodeEnum";
import { sendResponse } from "../utils/sendResponse";

export async function signUpHandler(req: express.Request, res: express.Response ){
    const user = userSchema.safeParse({ email:req.body.email, password:req.body.password });
    if( !user.success )
        return sendError( res , Status.BAD_REQUEST , "ValidationError", z.prettifyError(user.error));
    //do db storage
    return sendResponse( res, Status.CREATED , "User created" , Math.random());

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