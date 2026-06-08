import { createClient } from "redis";
import { type engineRequest, type engineCommand } from "../src/types/engine.types";
import  crypto from "crypto";
import { waitingForResponse } from "./pending-response";

const client =  createClient({
  url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
})


client.on("error" ,()=> console.log(" Redis client error"));
const publisher = await client.connect();






export async function sendToEngine( engineCommand : engineCommand , payload: Record< string, unknown> )
{
   console.log("send to engine called")
    const correlationId = crypto.randomUUID();
    const engineRequest: engineRequest ={
        correlationId,
        engineCommand,
        payload
    }

    const pendingResponse =  waitingForResponse( correlationId , 100000);
    publisher.lPush("request-queue", JSON.stringify(engineRequest));
    return pendingResponse;
   
   
}