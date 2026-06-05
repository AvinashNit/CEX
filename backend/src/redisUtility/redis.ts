const orderPublisher = await createClient({
    url: "rediss://default:gQAAAAAAAYfRAAIgcDIzYmFiMDUzZDhmNDg0NDBlOWRhYTU3ZGVjOWU4YjRmYg@kind-osprey-100305.upstash.io:6379"
}).on ( "error", (err)=>{console.log("Redis client error",err)})
.connect();
