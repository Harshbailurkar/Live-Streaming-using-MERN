import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));
// app.use(express.raw({ type: "application/webhook+json" }));
app.use(bodyParser.json());
// Use URL-encoded body parser middleware
app.use(express.urlencoded({ extended: true }));
// Use raw body parser middleware
app.use(bodyParser.raw({ type: "application/webhook+json" }));

import userRouter from "../routes/user.routes.js";
import streamRouter from "../routes/stream.routes.js";
import webhookRouter from "../routes/livekitWebhook.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/streams", streamRouter);
app.use("/api/v1/webhooks", webhookRouter);
