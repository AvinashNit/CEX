
import { orderPublisher as responseListener } from "./redis.createClient";
let pendingResolveOrder = new Map<number, Function>;

async function main()
{
    while(1)
    {
    const res = await responseListener.brPop("response_queue",0);
    if(res)
    {
        console.log("inside the main funtion after listening")
        const parsedData = JSON.parse(res.element);
        if(pendingResolveOrder.has(parsedData.id) !== undefined )
        {
            pendingResolveOrder.get(parsedData.id)!(parsedData.filled);
            pendingResolveOrder.delete(parsedData.id);
        }

    }
}

}
main();



export function untilWeBack( id : number)
{
    return new Promise((resolveOrder, rejectOrder)=>{
        pendingResolveOrder.set(id , resolveOrder);
    })
}