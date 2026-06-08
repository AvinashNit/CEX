import { createClient } from "redis";

const client =  createClient({
    url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
  })
  
  
  client.on("error" ,()=> console.log(" Redis client error"));
  const listner =await client.connect();
  


  const client2 =  createClient({
    url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
  })
  
 


interface engineResponse {
    correlationId : string,
    ok: boolean,
    payload?: Record<string, unknown>,
    error?: string
}

  
  client2.on("error" ,()=> console.log(" Redis client error"));
  const  publisher = await client2.connect();


  while(true)
  {
    console.log("engine listening request")
     const request  = await listner.brPop("request-queue",0);
     if(!request)
        continue;
    const parsedRequest  =  JSON.parse(request.element);
    console.log(parsedRequest)
    console.log("started pushing into response queue")
     await publisher.lPush("response-queue", JSON.stringify({
        correlationId: parsedRequest.correlationId,
        ok:true,
        payload:{
            ...parsedRequest.payload
        }

     }))
     console.log("pushed into response queue");

  }

  
  