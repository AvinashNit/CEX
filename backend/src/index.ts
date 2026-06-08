// import express from "express";


// const app =  express();










// POST /order
// GET /depth/:symbol
// GET /balance
// GET /order/:orderId
// DELETE /order/:orderId


// GET /depth/:symbol

// GET /balance

// GET /balance// "orderId":"<order-id>",
// "side":"buy",
// "type":"limit",
// "symbol":"BTC",
// "price":100,
// "qty":5,
// "filledQty":0,
// "status":"open",
// "fills": []
// }

// "error":"order not found"
// "error":"order not found"


// DELETE /order/:orderId//"error":"filled orders cannot be cancelled"





// app.use(( err, req, res, next )=>{
//     return res.status()
// })



// app.listen( process.env.PORT || 3000 ,()=>{
//     console.log(`Server running on port ${process.env.PORT || 3000}`)
// })




import express from  "express";
import cors from "cors";
import { sendToEngine } from "../services/redis-client-service";
import { listenToEngineResponse } from "../services/pending-response";


const app = express();

listenToEngineResponse();
app.use(express());
app.use(cors())


app.use( async (req, res)=>{
    const time = Date.now()
    console.log()
    const response  = await sendToEngine("create_order" , {
        symbol:"BTC",
        side:"buy",
        type:"limit",
        price:100,
        qty:5
    })    
    const time2 = Date.now();
    console.log("time taken to push to push to redis" ,time2 - time );

     res.json(response);

     console.log("time taken to get response from engine", Date.now() - time2)
     return ;

})




app.listen(3000, ()=>{
    console.log("Server running");
    console.log(process.cwd());
})