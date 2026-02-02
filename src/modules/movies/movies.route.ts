import express from "express";
import { MediaController } from "./movies.controller.js";

const router = express.Router();
// /api route
router.get("/search", MediaController.searchMulti);
router.get("/:mediaType/:movieId", MediaController.getDetail);

export const movieRouter = router;
