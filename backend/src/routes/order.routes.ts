import { Router } from "express";
import { orderHandler } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const orderRouter =  Router();

orderRouter.post("/order", authMiddleware, orderHandler);

export { orderRouter }