import type { Response } from "express";

interface apiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const success = <T>(
  res: Response,
  data: T,
  message = "success",
  statusCode = 200
): Response<apiResponse<T>> => {
  return res.status(statusCode).json({ success: true, message, data });
};

export const error = <T>(
  res: Response,
  message = "Internal Server Error",
  statusCode = 500
): Response<apiResponse<T>> => {
  return res.status(statusCode).json({ success: false, message });
};
