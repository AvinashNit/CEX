
import { orderPublisher as responseListener } from "./redis.createClient";
let pendingResolveOrder = new Map<number, Function>;


export function untilWeBack(requestId : number)
{
    return new Promise((resolveOrder, rejectOrder)=>{
        pendingResolveOrder.set(requestId , resolveOrder);
    })
}

async function main()
{
    while(1)
    {
    const res = await responseListener.brPop("response_queue",0);
      {
        const parsedData = JSON.parse(res!.element);
        if(pendingResolveOrder.has(parsedData.id))
        {
            let resolve = pendingResolveOrder.get(parsedData.id);
            resolve!(parsedData.data);
            pendingResolveOrder.delete(parsedData.id);
        }

      }
}

}
 main();



