import type { AccessTokenPayload } from "../utils/jwt"; // Type imports should not include file extensions (.js).

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {};
