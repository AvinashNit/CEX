import  type { Request, Response } from "express";
import { orderSchema } from "../schema/order.schema";
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
    console.log(user_id);
    if(!user_id)
        throw new Error("Invalid user"); 
    
    const id = getId();
    const parsedOrderBody = orderSchema.safeParse({
        id, 
        user_id,
        symbol,
        side, 
        type, 
        price, 
        qty
    
    })
    if(!parsedOrderBody.success)
        throw new AppError( z.prettifyError(parsedOrderBody.error));

    await pushRequestOrder(parsedOrderBody.data);
    console.log("after pushed into order -queue")

    const filled =  await untilWeBack(id);
    console.log("after called untilwe back")
    sendResponse(res, Status.OK, "Order successfully placed", {filled, symbol , price});
    return;

}