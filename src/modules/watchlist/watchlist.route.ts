import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { WatchlistController } from "./watchlist.controller.js";

const router = express.Router();

router.post("/", requireAuth, WatchlistController.createWatchlist);
router.get("/", requireAuth, WatchlistController.getWatchlist);
router.put("/:movie_id", requireAuth, WatchlistController.updateWatchlist);
router.delete("/:movie_id", requireAuth, WatchlistController.deleteWatchlist);

export const watchlistRouter = router;
