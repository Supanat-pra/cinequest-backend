import { WatchlistRepository } from "../../db/repositories/watchlist.repositories.js";
import type { Watchlist } from "../watchlist/watchlist.type.js";

export const WatchlistService = {
  async createWatchlist(
    userId: number,
    mediaType: "movie" | "tv",
    tmdb_id: number,
    title: string,
    poster_path: string,
    review: string,
    rating: number,
  ): Promise<Watchlist> {
    const result = await WatchlistRepository.create(
      userId,
      mediaType,
      tmdb_id,
      title,
      poster_path,
      review,
      rating,
    );
    if (!result) {
      throw new Error("Failed to create watchlist");
    }
    return {
      user_id: result.user_id,
      media_type: result.media_type,
      title: result.title,
      poster_path: result.poster_path,
      tmdb_id: result.tmdb_id,
      review: result.review,
      rating: result.rating,
      created_at: result.created_at,
    };
  },

  async getWatchlist(userId: number): Promise<Watchlist[]> {
    const result = await WatchlistRepository.get(userId);
    return result;
  },

  async updateWatchlist(
    userId: number,
    tmdb_id: number,
    review: string,
    rating: number,
  ): Promise<Watchlist> {
    const result = await WatchlistRepository.update(
      userId,
      tmdb_id,
      review,
      rating,
    );
    if (!result) {
      throw new Error("Failed to update watchlist");
    }
    return result;
  },

  async deleteWatchlist(userId: number, tmdb_id: number) {
    const result = await WatchlistRepository.delete(userId, tmdb_id);
    if (!result) {
      throw new Error("Failed to delete watchlist");
    }
    return result;
  },
};
