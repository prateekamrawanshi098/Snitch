import express from "express";
import authRouter from "./routes/auth.router.js";
import morgan from "morgan";
/**========================================== */

const app = express();

/**=================Middlewares====================================== */

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRouter);

export default app;
