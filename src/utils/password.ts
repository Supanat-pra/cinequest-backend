import type { Request, Response } from "express";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error("No password provided!");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  password_hash: string,
): Promise<boolean> => {
  const matchPassword = await bcrypt.compare(password, password_hash);
  return matchPassword;
};
