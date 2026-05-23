import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";
import { validateLogin } from "../validators/auth.validator.js";
import { loginController } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post("/register", validateRegister, registerController);

authRouter.post("/login",validateLogin,loginController)

export default authRouter;
