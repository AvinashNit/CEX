import type{ Request, Response } from "express";
import { getId } from "../utils/id.generate";
import { AppError } from "../utils/AppError";
import { pushRequestOrder } from "../redisService/redis.pushService";
import { untilWeBack } from "../redisService/redis.listen.response";
import { sendResponse } from "../utils/sendResponse";
import { getOrderBook } from "../schema/order.schema";
import { Status } from "../schema/status.schema";


export async function getOrderBookHandler ( req: Request, res: Response)
{
    const symbol = req.params.symbol;
    const requestId = getId();
    const orderbookBody = getOrderBook.safeParse({
        requestId ,
        event:"GET_ORDERBOOK",
        data: {
             symbol: symbol,
        }
    })
    if(!orderbookBody.success)
        throw new AppError("failed parsing orderbook body");

    await pushRequestOrder( orderbookBody.data );

    const responseback = await untilWeBack(requestId)
    return sendResponse( res, Status.OK, "testing orderbook")
}