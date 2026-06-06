import  { Router } from "express";
import { loginHandler, signUpHandler } from "../controllers/auth.controller";

const authRouter =  Router();

authRouter.post("/signup",signUpHandler);
authRouter.post("/login", loginHandler);

export { authRouter };