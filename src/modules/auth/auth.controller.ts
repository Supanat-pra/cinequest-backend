import type { Request, Response } from "express";
import { success, error } from "../../utils/apiResponse.js";
import { AuthService } from "./auth.service.js";

export const AuthController = {
  async register(req: Request, res: Response) {
    const { email, username, password, first_name, last_name } = req.body;
    try {
      const result = await AuthService.register(
        email,
        username,
        password,
        first_name,
        last_name
      );
      return success(res, result, "User Created", 201);
    } catch (err) {
      error(res, "Cannot register", 500);
    }
  },
};
