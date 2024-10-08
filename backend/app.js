import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.VITE_BASE_URL,
  })
);
console.log(process.env.VITE_BASE_URL);

app.use(express.urlencoded({ extended: true }));

import userRouter from "./src/routers/userRouters.js";
import bankRouter from "./src/routers/bankRouters.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bank", bankRouter);

app.use((err, req, res, next) => {
  const message = err.message || "Internal server Error";
  res.json({
    success: false,
    message: message,
  });
});

export default app;
