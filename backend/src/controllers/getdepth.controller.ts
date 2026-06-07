import type{ Request, Response } from "express";
import { getId } from "../utils/id.generate";
import { AppError } from "../utils/AppError";
import { pushRequestOrder } from "../redisService/redis.pushService";
import { untilWeBack } from "../redisService/redis.listen.response";
import { sendResponse } from "../utils/sendResponse";
import { getDepthSchema } from "../schema/general.schema";
import { Status } from "../schema/status.schema";


export async function getDepthHandler ( req: Request, res: Response)
{
    const symbol = req.params.symbol as string;
    const requestId = getId();
    const getDepthBody = getDepthSchema.safeParse({
        requestId ,
        event:"GET_DEPTH",
        data: {
              symbol: symbol,
        }
    })
    if(!getDepthBody.success)
        throw new AppError("failed pasing depth body");

    await pushRequestOrder( getDepthBody.data,requestId );

    const response = await untilWeBack(requestId);
    return sendResponse( res, Status.OK, "fetched depth successfully",response)
}