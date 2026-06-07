import { orderBook } from "./data";

export function handleCreateOrder(symbol:string, userId: string, orderId: number, side: "BUY" | "SELL", price: number, qty: number, type: "LIMIT"| "MARKET")
{
    
    if( type === "LIMIT")
        return orderBook.matchLimitOrder( {  userId, orderId, price, qty } ,side, symbol)
    else
        return orderBook.matchMarketOrder({userId , orderId, price, qty }, side, symbol );
}