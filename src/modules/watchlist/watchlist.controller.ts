import type { Request, Response } from "express";
import { success, error } from "../../utils/apiResponse.js";
import { WatchlistService } from "./watchlist.service.js";

export const WatchlistController = {
  async createWatchlist(req: Request, res: Response) {
    if (!req.user) {
      return error(res, "Unauthorized", 401);
    }
    const { userId } = req.user;
    const { movieId } = req.params;
    const { review, rating } = req.body;
    if (typeof movieId !== "string") {
      return error(res, "Path params is not string", 400);
    }
    const movie_id = Number(movieId);
    try {
      const result = await WatchlistService.createWatchlist(
        userId,
        movie_id,
        review ?? null,
        rating ?? null,
      );
      return success(res, result, "Watchlist created");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message);
      }
      return error(res, "Cannot create watchlist");
    }
  },

  async getWatchlist(req: Request, res: Response) {
    if (!req.user) {
      return error(res, "Unauthorized", 401);
    }
    const { userId } = req.user;
    try {
      const result = await WatchlistService.getWatchlist(userId);
      return success(res, result, "Watchlist fetch");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message);
      }
      return error(res, "Cannot create watchlist");
    }
  },

  async updateWatchlist(req: Request, res: Response) {
    if (!req.user) {
      return error(res, "Unauthorized", 401);
    }
    const { userId } = req.user;
    const { movieId } = req.params;
    const { review, rating } = req.body;
    const tmdb_id = Number(movieId);
    try {
      const result = await WatchlistService.updateWatchlist(
        userId,
        tmdb_id,
        review,
        rating,
      );
      return success(res, result, "Watchlist updated");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message);
      }
      return error(res, "Cannot create watchlist");
    }
  },

  async deleteWatchlist(req: Request, res: Response) {
    if (!req.user) {
      return error(res, "Unauthorized", 401);
    }
    const { userId } = req.user;
    const { movieId } = req.params;
    const tmdb_id = Number(movieId);
    try {
      const result = await WatchlistService.deleteWatchlist(userId, tmdb_id);
      return success(res, result, "Watchlist deleted");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message);
      }
      return error(res, "Cannot delete watchlist");
    }
  },
};
