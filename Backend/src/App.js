import express from "express";
import authRouter from "./routes/auth.router.js";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";
import productRouter from "./routes/product.routes.js";
import cookieParser from "cookie-parser";


/**========================================== */

const app = express();

/**=================Middlewares====================================== */

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
passport.use(
  new googleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);
app.use(morgan("dev"));
// app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //     methods: ["GET", "POST", "UPDATE", "DELETE"],
// //   }),
// // );

/**============Routes============================= */
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

export default app;
