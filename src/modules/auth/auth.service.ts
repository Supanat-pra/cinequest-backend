import { UserRepository } from "../../db/repositories/user.repositories.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { signToken } from "../../utils/jwt.js";
import type { AuthUser, AuthResponse } from "./auth.type.js";
import { error } from "../../utils/apiResponse.js";

export const AuthService = {
  async register(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
  ): Promise<AuthUser> {
    const password_hash = await hashPassword(password);
    const user = await UserRepository.create(
      first_name,
      last_name,
      email,
      username,
      password_hash,
    );
    if (!user) {
      throw new Error("User cannot register");
    }
    return {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      created_at: user.created_at,
    };
  },

  async login(username: string, password: string): Promise<AuthResponse> {
    const userRow = await UserRepository.findByUsername(username);
    if (!userRow) {
      throw new Error("Invalid username or password");
    }
    const matchPassword = await comparePassword(
      password,
      userRow.password_hash,
    );
    if (!matchPassword) {
      throw new Error("Invalid email or password");
    }
    const accessToken = signToken(userRow.user_id);
    const user: AuthUser = {
      user_id: userRow.user_id,
      first_name: userRow.first_name,
      last_name: userRow.last_name,
      email: userRow.email,
      username: userRow.username,
      created_at: userRow.created_at,
    };
    return {
      user,
      accessToken,
    };
  },

  async profile(userId: number): Promise<AuthUser> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
