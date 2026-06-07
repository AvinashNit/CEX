import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getBalanceHandler, updateBalanceHandler } from "../controllers/balance.controller";

const balanceRouter =   Router();
balanceRouter.get("/balance", authMiddleware, getBalanceHandler);
balanceRouter.get("/balance/:asset", authMiddleware , getBalanceHandler);
balanceRouter.post("/balance", authMiddleware, updateBalanceHandler);

export { balanceRouter };