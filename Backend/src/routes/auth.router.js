import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerController);

export default authRouter;
