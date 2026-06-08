import { authSchema } from "../types/auth.schema";
import { sendValidationError } from "../utills/send-validation-error";
import type { Request, Response } from "express";
import prisma from "../utills/prima-client";
import { success } from "zod";
import { generateToken, hashPassword } from "../utills/auth.utils";
import bcrypt from "bcrypt";


export  async function signupController( req: Request, res: Response)
{
    const { email , password } = req.body;
    const signupbody = authSchema.safeParse({email, password});
    if(!signupbody.success)
        return sendValidationError( res,  signupbody.error);
    const userExist =  await prisma.user.findUnique({
        where:{
            email: signupbody.data.email,
        }
    })
    if(userExist)
    {
        return res.status(400).json({
            success:false,
            error: "user already exist"

        })
    }
    const user =  await prisma.user.create({
        data:{
            email: signupbody.data.email,
            password: await hashPassword(signupbody.data.password)
        
        }
    })
    return res.status(201).json({
        success: true,
        user
    })
    

}


export async function logingController( req: Request , res: Response)
{
    const { email, password } = req.body;
    const loginbody = authSchema.safeParse({ email, password });
    if(!loginbody.success)
        return sendValidationError( res, loginbody.error );
    const userExist = await prisma.user.findUnique({
        where:{
        email: loginbody.data.email
        }
    })
    if(!userExist)
        return res.status(400).json({
            success: false,
            error: "user not found"
        })
        
                const userVerified =  await bcrypt.compare( userExist.password, loginbody.data.password);
                if(!userVerified)
                    return res.status(400).json({
                        success: false,
                        error: "invalid credentials"
                    })
                
                return res.status(200).json({
                    success: true,
                    token: generateToken( userExist.id )
                })
            
        
}