import type { Request, Response } from "express";
import { success, error } from "../../utils/apiResponse.js";
import { AuthService } from "./auth.service.js";

export const AuthController = {
  async register(req: Request, res: Response) {
    const { first_name, last_name, email, username, password } = req.body;
    try {
      const result = await AuthService.register(
        first_name,
        last_name,
        email,
        username,
        password,
      );
      return success(res, result, "User Created", 201);
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message, 400);
      }
      return error(res, "Cannot register", 500);
    }
  },

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const result = await AuthService.login(username, password);
      res.cookie("accessToken", result.accessToken, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return success(res, result.user, "User login");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message, 401);
      }
      return error(res, "Cannot login", 500);
    }
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only(production)
      sameSite: "strict",
    });
    return success(res, "User logout");
  },

  async profile(req: Request, res: Response) {
    const { userId } = req.user;
    try {
      const result = await AuthService.profile(userId);
      return success(res, result, "User fetched");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message, 404);
      }
      return error(res, "User not found", 404);
    }
  },
};
