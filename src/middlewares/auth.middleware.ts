import type { Request, Response, NextFunction } from "express";
import { error } from "../utils/apiResponse.js";
import { verifyToken, type AccessTokenPayload } from "../utils/jwt.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return error(res, "Please login first", 401);
  }
  try {
    const decodedToken: AccessTokenPayload = verifyToken(accessToken);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return error(res, "Unauthorized", 401);
  }
};
