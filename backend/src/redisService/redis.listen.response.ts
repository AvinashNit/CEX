
import { orderPublisher as responseListener } from "./redis.createClient";
let pendingResolveOrder = new Map<number, Function>;


export function untilWeBack( id : number)
{
    return new Promise((resolveOrder, rejectOrder)=>{
        pendingResolveOrder.set(id , resolveOrder);
    })
}

async function main()
{
    while(1)
    {
    const res = await responseListener.brPop("response_queue",0);
      {
        const parsedData = JSON.parse(res!.element);
        console.log(parsedData)
        if(pendingResolveOrder.has(parsedData.id))
        {
            let resolve = pendingResolveOrder.get(parsedData.id);
            resolve!(parsedData.filled);
            pendingResolveOrder.delete(parsedData.id);
        }

      }
}

}
 main();



