import { request } from "express";
import z from "zod";

enum Symbol {
    "BTCUSDT" = "BTCUSDT",
    "ETHUSDT" = "ETHUSDT",
    "BNBUSDT" = "BNBUSDT",
    "ADAUSDT" = "ADAUSDT",
    "XRPUSDT" = "XRPUSDT",
    "DOGEUSDT" = "DOGEUSDT",


}

const orderSchema  = z.object({
    requestId: z.number(),// id
    orderId: z.number(),
    user_id: z.string({message: "user_id must be a string"}),// user_id
    symbol: z.enum(Object.values(Symbol)),
    side : z.enum(["BUY" , "SELL"]),
    type : z.enum(["LIMIT", "MARKET"]),
    price: z.coerce.number().positive({message: "price must be a positive number"}),
    qty: z.coerce.number().positive({message: "quantity must be a positive number"}),
    
})


type universalBody = z.infer< typeof orderSchema>



export { orderSchema, type universalBody};


const createOrderSchema = z.object({
    requestId: z.number(),
    event : z.literal("CREATE_ORDER"),
    data: orderSchema.pick({
        orderId: true,
        symbol: true,
        type: true,
        side: true,
        price: true,
        qty: true
    })

    
})

const getDepthSchema = z.object({
    requestId: z.number(),
    event: z.literal("GET_DEPTH"),
    data: orderSchema.pick({
        symbol: true,
    })
})


const cancelOrderSchema = z.object({
    requestId: z.number(),
    event: z.literal("CANCEL_ORDER"),
    data: orderSchema.pick({
        orderId: true,

    })
})

const getOrderBook = z.object({
    requestId: z.number(),
    event: z.literal("GET_ORDERBOOK"),
    data:orderSchema.pick({
        symbol: true,
    })
    
})

type createOrderbody = z.infer<typeof createOrderSchema>;
type cancelOrderbody = z.infer< typeof cancelOrderSchema>;
type getDepthbody = z.infer< typeof getDepthSchema>
type getOrderBookbody = z.infer< typeof getOrderBook>



export { createOrderSchema , cancelOrderSchema, getOrderBook,getDepthSchema, type createOrderbody, type cancelOrderbody, type getDepthbody , type getOrderBookbody};