import express from "express";
import authRouter from "./routes/auth.router.js";
import morgan from "morgan";
import cors from "cors";
/**========================================== */

const app = express();

/**=================Middlewares====================================== */

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "UPDATE", "DELETE"],
  }),
);

/**============Routes============================= */
app.use("/api/auth", authRouter);

export default app;
