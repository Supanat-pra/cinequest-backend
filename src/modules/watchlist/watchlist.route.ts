import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { WatchlistController } from "./watchlist.controller.js";

const router = express.Router();
// /watchlist route
router.post(
  "/:mediaType/:movieId",
  requireAuth,
  WatchlistController.createWatchlist,
);
router.get("/", requireAuth, WatchlistController.getWatchlist);
router.put("/:movieId", requireAuth, WatchlistController.updateWatchlist);
router.delete("/:movieId", requireAuth, WatchlistController.deleteWatchlist);

export const watchlistRouter = router;
