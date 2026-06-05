import type { Response } from "express";


export function sendError( res: Response ,status: number , message: string, error?: unknown)
{
    return res.status(status).json({
        success: false,
        message,
        error
    })
}