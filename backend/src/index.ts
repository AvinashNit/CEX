import express from "express";
import "dotenv/config";

//routers 
import { authRouter } from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();

app.use(express.json());

console.log(process.env.DATABASE_URL)

app.use(authRouter)
// app.post("/login", loginHandler);


// app.post("/order/:ordertype");//put order LIMIT  || MARKET
// app.get("/orders");//get all orders that i have put
// app.get("/order/:orderid");//particular order
// app.get("/order/status/:orderid");//status of a particular order kind or redundant
// app.get("/order/cancel/:orderid")//if order is still on order book
// app.get("/order/fill/:orderid");// fill or a market order


// app.get("/orderbook/:market");
// app.get("/depth/:market");


// app.get("/balance");
// app.post("/balance");




app.use(errorHandler);








app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server running over port ${process.env.PORT || 3000}`);
})