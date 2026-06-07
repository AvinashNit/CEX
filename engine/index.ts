
import { createClient } from "redis";
import { orderhandler } from "./src/enginecalls";

const orderSubscriber  =  await createClient({
    url : "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
})
.on("error", ( err )=>{console.log("Redis client error", err)})
.connect();

const responsePublisher =  await createClient({
    url:  "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
          
}).
on("error",(err)=>{console.log("Redis client error", err)})
.connect();

type EventType =
    | "CREATE_ORDER"
    | "GET_DEPTH"
    | "GET_ORDERBOOK"
    | "CANCEL_ORDER"
    | "GET_BALANCE"
    | "UPDATE_BALANCE"


    type EngineRequest = {
        requestId: number;
        event: EventType;
        data: generalPayload | balanceInterface
    };

import type{ generalPayload, balanceInterface } from "./src/enginecalls";


while(true)
{
    const orderReq  = await  orderSubscriber.brPop("order_queue", 0);
        let filled: unknown;
        const orderFields  =  JSON.parse(orderReq!.element) as EngineRequest ;
        const {requestId , event , data} = orderFields; 
        console.log(orderFields);
        console.log(requestId)
        if(event=== "GET_BALANCE")
            filled = orderhandler.GET_BALANCE(data as balanceInterface);
        else if(event === "UPDATE_BALANCE")
            filled = orderhandler.UPDATE_BALANCE(data as balanceInterface);
        
         console.log(filled);
         await responsePublisher.lPush("response_queue", JSON.stringify({
            id: orderFields!.requestId,
            data: filled
        })
            )

}