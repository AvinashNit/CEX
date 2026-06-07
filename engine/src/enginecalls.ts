import { orderBook ,balance} from "./data";
import { handleCreateOrder } from "./createOrder";
export interface generalPayload {
    symbol?: string,
    userId?: string,
    orderId?: number,
    side?: "BUY" | "SELL",
    price?: number,
    qty?: number,
    type?: "LIMIT" | "MARKET"
}

export interface balanceInterface {
    userId: string,
    asset?: string,
    amount?: number
}

 function create_order( generalPayload: generalPayload)
{
    if(generalPayload)
        return handleCreateOrder(generalPayload.symbol!, generalPayload.userId!, generalPayload.orderId!, generalPayload.side!, generalPayload.price!, generalPayload.qty!, generalPayload.type!);
}


 function get_depth( generalPayload : generalPayload)
{
    if(generalPayload.symbol)
        return orderBook.getDepth(generalPayload.symbol);
}

 function get_orderbook( generalPayload: generalPayload)
{
    if(generalPayload.symbol)
        return orderBook.getOrderBook(generalPayload.symbol);
}

 function cancel_order( generalPayload: generalPayload)
{
    if(generalPayload.orderId && generalPayload.symbol)
        return orderBook.cancelOrder(generalPayload.orderId, generalPayload.symbol);
}


function get_balance(balancebody: balanceInterface)
{
    return balance.getBalance(balancebody.userId, balancebody.asset)
}

function update_balance(balancebody: balanceInterface)
{
    return balance.updateBalance(balancebody.userId, balancebody.amount!)
}

export const orderhandler = {
    CREATE_ORDER: create_order,
    GET_DEPTH: get_depth,
    GET_ORDERBOOK: get_orderbook,
    CANCEL_ORDER : cancel_order,
    GET_BALANCE : get_balance,
    UPDATE_BALANCE : update_balance


}