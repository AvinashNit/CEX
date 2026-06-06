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
    id: z.number(),// id
    user_id: z.string({message: "user_id must be a string"}),// user_id
    symbol: z.enum(Object.values(Symbol)),
    side : z.enum(["BUY" , "SELL"]),
    type : z.enum(["LIMIT", "MARKET"]),
    price: z.coerce.number().positive({message: "price must be a positive number"}),
    qty: z.coerce.number().positive({message: "quantity must be a positive number"}),
    
})


type orderBody = z.infer< typeof orderSchema>


export { orderSchema, type orderBody};