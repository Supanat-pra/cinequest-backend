import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
}

export const signToken = (user_id: number): string => {
  const accessToken = jwt.sign({ userId: user_id }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
};

export const verifyToken = (token: string): AccessTokenPayload => {
  const decodedToken = jwt.verify(token, env.JWT_SECRET); // jwt.verify() returns: string | JwtPayload
  return decodedToken as AccessTokenPayload;
};
