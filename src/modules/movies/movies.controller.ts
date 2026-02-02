import type { Request, Response } from "express";
import { MediaService } from "./movies.service.js";
import { success, error } from "../../utils/apiResponse.js";

export const MediaController = {
  async getDetail(req: Request, res: Response) {
    const { mediaType, movieId } = req.params;
    try {
      // path params is string | undefined. need to make it string only
      if (mediaType !== "movie" && mediaType !== "tv") {
        return error(res, "Invalid media type", 400);
      }
      const media_type = mediaType; // path params is "movie" | "tv"
      const tmdb_id = Number(movieId); // path params is string | undefined
      const result = await MediaService.getDetail(tmdb_id, media_type);
      return success(res, result, "Fetched Movie Detail");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message);
      }
      return error(res, "Cannot fetch movie detail");
    }
  },

  async searchMulti(req: Request, res: Response) {
    const { q } = req.query;
    if (typeof q !== "string") {
      return error(res, "query not string", 400);
    }
    try {
      const result = await MediaService.searchMulti(q);
      return success(res, result, "Search completed");
    } catch (err) {
      if (err instanceof Error) {
        return error(res, err.message);
      }
      return error(res, "Cannot fetch movie detail");
    }
  },
};
