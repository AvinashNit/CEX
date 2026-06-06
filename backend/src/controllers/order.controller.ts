import  type { Request, Response } from "express";
import { createOrderSchema, orderSchema } from "../schema/order.schema";
import { AppError } from "../utils/AppError";
import z, { cuid2 } from "zod";
import { getId } from "../utils/id.generate";
import { sendError } from "../utils/sendError";
import { pushRequestOrder } from "../redisService/redis.pushService";
import { untilWeBack } from "../redisService/redis.listen.response";
import { sendResponse } from "../utils/sendResponse";
import { Status } from "../schema/status.schema";

export async function orderHandler( req: Request, res: Response )
{
    const { symbol, side, type, price, qty } = req.body;
    const user_id : string | undefined | null  = req.id;
    if(!user_id)
        throw new Error("Invalid user"); 
    
    const requestId = getId();
    const orderId = getId();
    const create_order_body =  createOrderSchema.safeParse({
        requestId,
        event: "CREATE_ORDER",
        data:{
            orderId,
            symbol,
            type,
            side,
            price,
            qty,
        }
        
        
    })

    if(!create_order_body.success)
        throw new AppError( z.prettifyError(create_order_body.error));

    
    await pushRequestOrder(create_order_body.data);

    const filled =  await untilWeBack( requestId );
    sendResponse(res, Status.OK, "Order successfully placed", {filled, symbol , price});
    return;

}