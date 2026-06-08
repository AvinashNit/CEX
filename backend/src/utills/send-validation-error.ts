import type{ Response  } from "express";
import { z } from "zod";


export function sendValidationError( res: Response, eror: z.ZodError){
    return res.status(400).json({
        success: false,
        error: "validation error",
        details: eror.issues
    })
}