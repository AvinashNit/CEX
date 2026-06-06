import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getOrderBookHandler } from "../controllers/getorderbook.controller";

const getOrderbookRouter = Router();


getOrderbookRouter.get("/orderbook/:symbol", authMiddleware, getOrderBookHandler)

export {getOrderbookRouter};