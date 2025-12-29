import express from "express";

export const router = express.Router();

router.post("/register");
router.post("/login");
router.post("/logout");
router.get("/profile");
router.put("/profile/update");
router.delete("/profile/delete");
