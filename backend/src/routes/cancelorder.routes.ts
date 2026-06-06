import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { cancelOrderHandler } from "../controllers/cancelorder.controller";


const cancelOrderRouter = Router();


cancelOrderRouter.get("/cancel/:orderId", authMiddleware, cancelOrderHandler)

export { cancelOrderRouter };