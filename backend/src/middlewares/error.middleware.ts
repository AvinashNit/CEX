import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { sendError } from "../utils/sendError";
import { Status } from "../schema/status.schema";


export function errorHandler( err :Error , req: Request, res: Response, next: NextFunction)
{
    if( err instanceof  AppError)
        return sendError( res, Status.BAD_REQUEST, "Validation Error/ Incorrect request headers",  err.message);
    return sendError( res, Status.INTERNAL_SERVER_ERROR, "Internal server error");
}