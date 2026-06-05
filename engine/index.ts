
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
    const orderReq  = await  orderSubscriber.brPop("order-queue", 2);
    if(orderReq)
    {
        const orderFields =  JSON.parse(orderReq.element);
        await responsePublisher.lPush("response-queue" , JSON.stringify({_identifier:orderFields._identifier, filled:2}));
    }
}