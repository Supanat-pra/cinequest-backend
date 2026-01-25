import express from "express";
import { MediaController } from "./movies.controller.js";

const router = express.Router();

router.get("/search", MediaController.searchMulti);
router.get("/:type/:movie_id", MediaController.getDetail);

export const movieRouter = router;
