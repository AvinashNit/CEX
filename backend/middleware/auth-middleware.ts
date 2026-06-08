import { type NextFunction, type Request ,type Response } from "express";
import { z } from "zod";
import { verifyToken } from "../src/utills/auth.utils";
import type { JwtPayload } from "jsonwebtoken";






export function authMiddleware( req: Request, res: Response , next: NextFunction){
    const token   = req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(401).json({
            success: false,
            error: "unauthorized"
        })
    try{
        const { userId } =  verifyToken( token ) as JwtPayload;
        req.userId = userId;
        next();
    }
    catch(err){
        throw new Error(" token verification failed ")
    }
}