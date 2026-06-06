import  { Router } from "express";
import { loginHandler, signUpHandler } from "../controllers/authController";

const authRouter =  Router();

authRouter.post("/signup",signUpHandler);
authRouter.post("/login", loginHandler);

export { authRouter };