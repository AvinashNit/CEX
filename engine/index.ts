
import { createClient } from "redis";


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


while(true)
{
    const orderReq  = await  orderSubscriber.brPop("order_queue", 0);

        const orderFields =  JSON.parse(orderReq!.element);
        console.log(orderFields);
        await responsePublisher.lPush("response_queue" , JSON.stringify({id:orderFields.requestId, filled:2}));
    
}