import { pool } from "../pool.js";

export interface Watchlist {
  user_id: number;
  tmdb_id: number;
  review: string;
  rating: number;
  created_at: Date;
}

export const WatchlistRepository = {
  async createWatchlist(
    user_id: number,
    tmdb_id: number,
    review: string,
    rating: number,
  ): Promise<Watchlist | null> {
    const query =
      "INSERT INTO watchlist (user_id, tmdb_id, review, rating) VALUES ($1, $2, $3, $4) RETURNING user_id, tmdb_id, review, rating, created_at";
    const values = [user_id, tmdb_id, review, rating];
    const result = await pool.query<Watchlist>(query, values);
    return result.rows[0] ?? null;
  },

  async getWatchlist(user_id: number): Promise<Watchlist[]> {
    const query =
      "SELECT user_id, tmdb_id, review, rating, created_at FROM watchlist WHERE user_id=$1";
    const result = await pool.query<Watchlist>(query, [user_id]);
    return result.rows;
  },

  async updateWatchlist(
    user_id: number,
    tmdb_id: number,
    review: string,
    rating: number,
  ): Promise<Watchlist | null> {
    const query =
      "UPDATE watchlist SET review=$3, rating=$4 WHERE user_id=$1 AND tmdb_id=$2 RETURNING user_id, tmdb_id, review, rating, created_at";
    const values = [user_id, tmdb_id, review, rating];
    const result = await pool.query<Watchlist>(query, values);
    return result.rows[0] ?? null;
  },

  async deleteWatchlist(
    user_id: number,
    tmdb_id: number,
  ): Promise<Watchlist | null> {
    const query =
      "DELETE FROM watchlist WHERE user_id=$1 AND tmdb_id=$2 RETURNING user_id, tmdb_id, review, rating, created_at";
    const values = [user_id, tmdb_id];
    const result = await pool.query<Watchlist>(query, values);
    return result.rows[0] ?? null;
  },
};
