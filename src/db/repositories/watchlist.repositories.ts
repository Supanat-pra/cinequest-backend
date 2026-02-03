import { pool } from "../pool.js";

export interface Watchlist {
  user_id: number;
  media_type: "movie" | "tv";
  tmdb_id: number;
  title: string;
  poster_path: string;
  review: string | null;
  rating: number | null;
  created_at: Date;
}

export const WatchlistRepository = {
  async create(
    userId: number,
    mediaType: "movie" | "tv",
    tmdb_id: number,
    title: string,
    poster_path: string,
    review: string | null = null,
    rating: number | null = null,
  ): Promise<Watchlist | null> {
    const query =
      "INSERT INTO watchlist (user_id, media_type, tmdb_id, title, poster_path, review, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, media_type, tmdb_id, title, poster_path, review, rating, created_at";
    const values = [
      userId,
      mediaType,
      tmdb_id,
      title,
      poster_path,
      review,
      rating,
    ];
    const result = await pool.query<Watchlist>(query, values);
    return result.rows[0] ?? null;
  },

  async get(userId: number): Promise<Watchlist[]> {
    const query =
      "SELECT user_id, media_type, tmdb_id, title, poster_path, review, rating, created_at FROM watchlist WHERE user_id=$1";
    const result = await pool.query<Watchlist>(query, [userId]);
    return result.rows ?? null;
  },

  async update(
    userId: number,
    tmdb_id: number,
    review: string,
    rating: number,
  ): Promise<Watchlist | null> {
    const query =
      "UPDATE watchlist SET review=$3, rating=$4 WHERE user_id=$1 AND tmdb_id=$2 RETURNING user_id, tmdb_id, review, rating, created_at";
    const values = [userId, tmdb_id, review, rating];
    const result = await pool.query<Watchlist>(query, values);
    return result.rows[0] ?? null;
  },

  async delete(userId: number, tmdb_id: number): Promise<Watchlist | null> {
    const query =
      "DELETE FROM watchlist WHERE user_id=$1 AND tmdb_id=$2 RETURNING user_id, tmdb_id, review, rating, created_at";
    const values = [userId, tmdb_id];
    const result = await pool.query<Watchlist>(query, values);
    return result.rows[0] ?? null;
  },
};
