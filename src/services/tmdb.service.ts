import axios, { type AxiosInstance } from "axios";
import { env } from "../config/env.js";

export interface TMDbSummaryResult {
  id: number;
  media_type: "movie" | "tv";
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

export interface TMDbMovieDetailResult {
  genres: { name: string }[]; // Array<{name:string}>
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface TMDbTVDetailResult {
  genres: { name: string }[]; // Array<{name:string}>
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

interface TMDbTypeCheckResult {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

export interface TMDbMultiSearchResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: TMDbSummaryResult[];
}

interface TMDbMultiSearchRawResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: unknown[];
}

export const tmdb: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${env.TMDB_API_V4_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// search multi include media types (movie | tv | person). Need to filter out "person".
function filterMediaType(result: unknown): TMDbSummaryResult | null {
  if (typeof result !== "object" || result === null) return null; // TypeGuard to check unknown type
  if (
    !("id" in result) ||
    typeof result.id !== "number" ||
    !("media_type" in result) ||
    typeof result.media_type !== "string"
  ) {
    return null;
  }
  const item = result as TMDbTypeCheckResult;
  if (item.media_type !== "movie" && item.media_type !== "tv") {
    return null;
  }

  return {
    id: item.id,
    media_type: item.media_type,
    title:
      item.media_type === "movie"
        ? (item.title ?? "Unknown Title")
        : (item.name ?? "Unknown Name"),
    overview: item.overview ?? "",
    poster_path: item.poster_path ?? null,
    vote_average: item.vote_average ?? 0,
  };
}

export const TMDbservice = {
  async searchMulti(query: string): Promise<TMDbMultiSearchResponse> {
    const res = await tmdb.get<TMDbMultiSearchRawResponse>("/search/multi", {
      params: { query },
    });
    const results = res.data.results
      .map((result) => filterMediaType(result))
      .filter((result): result is TMDbSummaryResult => result !== null);
    return {
      page: res.data.page,
      total_pages: res.data.total_pages,
      total_results: res.data.total_results,
      results,
    };
  },

  async getMovieById(id: number): Promise<unknown> {
    const res = await tmdb.get(`/movie/${id}`);
    return res.data;
  },

  async getTVById(id: number): Promise<unknown> {
    const res = await tmdb.get(`/tv/${id}`);
    return res.data;
  },

  async getAllDetail(
    id: number,
    media_type: "movie" | "tv",
  ): Promise<TMDbMovieDetailResult | TMDbTVDetailResult | null> {
    if (media_type === "movie") {
      const data = await this.getMovieById(id);
      return data as TMDbMovieDetailResult;
    } else {
      const data = await this.getTVById(id);
      return data as TMDbTVDetailResult;
    }
  },
};
