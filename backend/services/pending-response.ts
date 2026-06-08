import { parse } from "dotenv";
import type { engineResponse } from "../src/types/engine.types"
import { createClient } from "redis";

type pendingResponse = {
    
    timeout: NodeJS.Timeout,
    resolve: ( response : Record<string, unknown> )=> void,
    reject: ( error: Error)=> void,
     
}

const client =  createClient({
    url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
  })
  
  
  client.on("error" ,()=> console.log(" Redis client error"));

  const listner = await client.connect();

  
const pendingResponses =  new Map< string , pendingResponse>

export function waitingForResponse( correlationId: string, period: number):Promise<Record<string, unknown>>
{
    console.log("waitingForResponse called")
    return new Promise((resolve, reject)=>{
        const timeout =  setTimeout(()=>{
            pendingResponses.delete(correlationId);
            reject("Session timed out")
        },period)
        pendingResponses.set( correlationId ,{
            timeout,
            resolve,
            reject
        })

    })

    
}

export async function listenToEngineResponse(): Promise<void>
{
    console.log("listenToEngineResponse started")
    while(true)
    {

        const incomingResponse = await listner.brPop("response-queue", 0);

        if(incomingResponse)
        {
            console.log("Response from engine arrived")
            const parsed = JSON.parse(incomingResponse.element);
            console.log("message arrived from engine", parsed);
            if( parsed.correlationId && pendingResponses.has(parsed.correlationId)){
                const matchedRequest  =  pendingResponses.get(parsed.correlationId);
                clearTimeout(matchedRequest?.timeout);
                if(parsed.ok)
                    matchedRequest?.resolve( parsed.response );

                    matchedRequest?.reject(parsed.error);
                pendingResponses.delete(parsed.correlationId);
            }    
        }

    }
}