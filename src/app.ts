import express from "express";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express(); //app: Express type

const corsOption: CorsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(helmet());
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

export { app };
