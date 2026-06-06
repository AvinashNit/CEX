import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/token.gen.verify";


export function authMiddleware( req: Request , res: Response, next : NextFunction ){
    
    const token = req.headers.authorization?.split(" ")[1];
    
    if(!token)
        throw new AppError("No token provided");
    const id =  verifyToken(token);
    req.id = id;
    console.log(id);
    next();
}