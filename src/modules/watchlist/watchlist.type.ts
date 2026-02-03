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
