import  { Router } from "express";
import { signUpHandler } from "../controllers/authController";

const authRouter =  Router();

authRouter.post("/signup",signUpHandler);

export { authRouter };