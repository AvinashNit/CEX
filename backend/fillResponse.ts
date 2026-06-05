import { createClient } from "redis";


let pendingResolves: {_identifier: number, resolve: Function}[] = [] ;

const responseSubscriber = await createClient({
    url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
}).on("error", (err)=>{console.log("REdis client error",err)}).connect();


async function orderListener ()
{
    while(true)
    {
        const responseBody  =  await responseSubscriber.brPop("response-queue",3);
        if(responseBody){
            const responseData = JSON.parse(responseBody.element);
            console.log(responseData);
            const body = pendingResolves.find((p)=> p._identifier === responseData._identifier);
            if(body)
                body.resolve(responseData.filled);
            
        }

    }
}

orderListener();

export function fillOrder( _identifier: number)
{
    return new Promise((resolve, reject)=>{
        pendingResolves.push({_identifier, resolve});
    })
}