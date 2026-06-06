import express from "express";
import "dotenv/config";

//routers 
import { authRouter } from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import { sendResponse } from "./utils/sendResponse";
import { Status } from "./schema/status.schema";
import { orderHandler } from "./controllers/order.controller";
import { orderRouter } from "./routes/order.routes";
import { cancelOrderRouter } from "./routes/cancelorder.routes";
import { getDepthRouter } from "./routes/getdepth.routes";
import { getOrderbookRouter } from "./routes/getorderbook.routes";
const app = express();

app.use(express.json());


console.log("server started")
app.use(authRouter)
// app.post("/login", loginHandler);

app.use(orderRouter);

app.use(cancelOrderRouter);

app.use(getDepthRouter);

app.use(getOrderbookRouter);







// app.post("/order", authMiddleware, orderHandler)


// app.post("/order/:ordertype");//put order LIMIT  || MARKET
// app.get("/orders", authMiddleware, (req, res)=>{
    // return sendResponse(res,Status.OK, "ya youhi tth " )
//get all orders that i have put
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