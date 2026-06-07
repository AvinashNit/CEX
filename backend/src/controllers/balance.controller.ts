import type { Request, Response } from "express";
import { pushRequestOrder } from "../redisService/redis.pushService";
import { getbalanceSchema ,updateBalanceSchema } from "../schema/general.schema";
import { AppError } from "../utils/AppError";
import z from "zod";
import { getId } from "../utils/id.generate";
import { untilWeBack } from "../redisService/redis.listen.response";
import { sendResponse } from "../utils/sendResponse";
import { Status } from "../schema/status.schema";


export async function updateBalanceHandler( req: Request, res: Response)
{
    let  { amount, asset } = req.body;
    const userId =  req.id;
    const requestId = getId();
    const parsed = updateBalanceSchema.safeParse({
        requestId,
        event: "UPDATE_BALANCE",
        data:{
        amount,
        asset,
        userId
        }
    })
    if(!parsed.success)
        throw new AppError(z.prettifyError(parsed.error))
    await pushRequestOrder(parsed.data, requestId)
    const response =  await untilWeBack( requestId );
    return sendResponse( res, Status.OK ,"updated balance successfully", response)
}


export async function getBalanceHandler( req: Request, res: Response)
{
    const userId =  req.id;
    let asset =  req.params.asset ?? "USD"
    

    const requestId = getId();
    const parsed = getbalanceSchema.safeParse({
        requestId,
        event: "GET_BALANCE",
        data:{
        asset,
        userId
        }
    })
    if(!parsed.success)
        throw new AppError(z.prettifyError(parsed.error))
     await pushRequestOrder(parsed.data, requestId);
     const response =  await untilWeBack( requestId );
     return sendResponse( res, Status.OK ,"fetched balance successfully", response) 

}
