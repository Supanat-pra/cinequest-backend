import express from "express";
import { MediaController } from "./movies.controller.js";

const router = express.Router();

router.get("/:type/:movie_id", MediaController.getDetail);
router.get("/search", MediaController.searchMulti);

export const movieRouter = router;
