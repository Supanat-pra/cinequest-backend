import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", requireAuth);
router.get("/list", requireAuth);
router.put("/update/:tmdb_id", requireAuth);
router.delete("/delete/:tmdb_id", requireAuth);

export const watchlistRouter = router;
