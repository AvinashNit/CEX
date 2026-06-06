import { createClient } from "redis"
import type { cancelOrderbody, createOrderbody, getDepthbody, getOrderBookbody } from "../schema/order.schema";

const rawclient = createClient({
  url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
});

rawclient.on("error", function(err) {
  throw err;
});
const client = await rawclient.connect()

export async function pushRequestOrder( order: createOrderbody | cancelOrderbody | getDepthbody |getOrderBookbody  )
{
    await client.lPush("order_queue", JSON.stringify(order))
    return 
}