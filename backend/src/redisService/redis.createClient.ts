import { createClient } from 'redis';



const orderPublisher = createClient({
     url:  "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
  });
  
  await orderPublisher.connect();
  
  export { orderPublisher };