import type{ Request, Response } from "express";
import { cancelOrderSchema } from "../schema/general.schema";
import { getId } from "../utils/id.generate";
import { AppError } from "../utils/AppError";
import { pushRequestOrder } from "../redisService/redis.pushService";
import { untilWeBack } from "../redisService/redis.listen.response";
import { sendResponse } from "../utils/sendResponse";
import { Status } from "../schema/status.schema";



export async function cancelOrderHandler ( req: Request, res: Response)
{
    let orderIdString = req.params.orderId as string;

    let orderId = parseInt(orderIdString);
    const requestId = getId();
    const cancelBody = cancelOrderSchema.safeParse({
        requestId ,
        event:"CANCEL_ORDER",
        data: {
            orderId: orderId,
        }
    })
    if(!cancelBody.success)
        throw new AppError("failed parsing cancel order body");

    await pushRequestOrder( cancelBody.data,requestId );

    const filled  = await untilWeBack( requestId )
    return sendResponse( res, Status.OK, "testing cancel order", filled )
}