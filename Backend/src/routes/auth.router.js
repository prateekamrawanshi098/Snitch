import { Router } from "express";
import { googleCallback, registerController } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";
import { validateLogin } from "../validators/auth.validator.js";
import { loginController } from "../controllers/auth.controller.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerController);

authRouter.post("/login", validateLogin, loginController);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false ,failureRedirect:"http://localhost:5173/login"}),
  googleCallback
);

export default authRouter;
