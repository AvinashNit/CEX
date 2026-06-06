import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getDepthHandler } from "../controllers/getdepth.controller";


const getDepthRouter = Router();


getDepthRouter.get("/depth/:symbol", authMiddleware, getDepthHandler)

export {getDepthRouter};