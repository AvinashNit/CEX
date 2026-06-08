import { symbol, z } from "zod";

const symbolParamSchema = z.object({
    symbol: z.string().trim().min(1,"symbol is required")
})

const OrderIdParamsSchema = z.object({
    orderId: z.string().trim().min(1,"orderId is required")
})

const orderBodySchema = z.discriminatedUnion("type",[
    z.object({
        type: z.literal("limit"),
        symbol: z.string().min(1,"symbol is required"),
        price: z.number().positive("price must be postive"),
        qty: z.number().positive("qty must be postive"),
        side: z.enum(["buy","sell"])

    }),
    z.object({
        type: z.literal("market"),
        symbol: z.string().trim().min(1, "symbol is required"),
        qty: z.number().positive("qty must be postive"),
        side: z.enum(["buy","sell"]),
        price: z.number().optional(),
        
    
})
])


export  {
    symbolParamSchema,
    OrderIdParamsSchema,
    orderBodySchema
}
