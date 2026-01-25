import express from "express";
import { AuthController } from "./auth.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", requireAuth, AuthController.profile);
// router.put("/me");
// router.delete("/me");

export const authRouter = router;
