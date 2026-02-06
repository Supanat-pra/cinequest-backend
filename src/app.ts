import express from "express";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { limiter } from "./middlewares/ratelimiter.middleware.js";

const app = express(); //app: Express type

const corsOption: CorsOptions = {
  origin: ["http://localhost:5173", "https://cinequest-frontend.vercel.app"],
  credentials: true,
};
app.set("trust proxy", 1);
app.use(limiter);
app.use(helmet());
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

export { app };
