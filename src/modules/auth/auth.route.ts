import express from "express";
import { AuthController } from "./auth.controller.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
// router.get("/profile");
// router.put("/profile/update");
// router.delete("/profile/delete");

export const authRouter = router;
