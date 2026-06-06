import { createClient } from "redis"
import type { orderBody } from "../schema/order.schema";

const rawclient = createClient({
  url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
});

rawclient.on("error", function(err) {
  throw err;
});
const client = await rawclient.connect()

export async function pushRequestOrder( order: orderBody)
{
    await client.lPush("order_queue", JSON.stringify(order))
    return 
}