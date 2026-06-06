
cont handlers ={
    CREATE_ORDER : createOrder,
    GET_DEPTH :getDepth,
    CANCEL_ORDER : cancelOrder,
    GET_ORDERBOOK : getOrderBook
}



interface engineCallSchema<T>  {
    id: number,
    event: string,
    data: T
}