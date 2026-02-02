import { TMDbservice } from "../../services/tmdb.service.js";
import type {
  TMDbMovieDetailResult,
  TMDbTVDetailResult,
} from "../../services/tmdb.service.js";

export interface MediaDetail {
  genres: Array<{ name: string }>; //{ name: string }[]
  id: number;
  media_type: "movie" | "tv";
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
export const MediaService = {
  async getDetail(
    tmdb_id: number,
    media_type: "movie" | "tv",
  ): Promise<MediaDetail> {
    if (media_type === "movie") {
      const result = await TMDbservice.getMovieById(tmdb_id);
      if (
        !result ||
        typeof result !== "object" ||
        !("id" in result) ||
        !("title" in result)
      ) {
        throw new Error("Invalid Movie data received from API");
      }
      const movie = result as TMDbMovieDetailResult;
      return {
        genres: movie.genres,
        id: movie.id,
        media_type: "movie",
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        vote_average: movie.vote_average,
      };
    }
    if (media_type === "tv") {
      const result = await TMDbservice.getTVById(tmdb_id);
      if (
        !result ||
        typeof result !== "object" ||
        !("id" in result) ||
        !("name" in result)
      ) {
        throw new Error("Invalid Movie data received from API");
      }
      const tv = result as TMDbTVDetailResult;
      return {
        genres: tv.genres,
        id: tv.id,
        media_type: "tv",
        overview: tv.overview,
        poster_path: tv.poster_path,
        release_date: tv.first_air_date,
        title: tv.name,
        vote_average: tv.vote_average,
      };
    }
    throw new Error("Wrong media type");
  },

  async searchMulti(query: string) {
    const result = await TMDbservice.searchMulti(query);
    if (!result) {
      throw new Error("Search not found");
    }
    return result;
  },
};
