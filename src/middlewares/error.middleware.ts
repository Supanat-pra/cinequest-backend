import type { Request, Response, NextFunction } from "express";
import { isProd } from "../config/env.js";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!isProd) {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  } else {
    res.status(err.statusCode || 500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
