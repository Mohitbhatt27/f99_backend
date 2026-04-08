import express from "express";
import auth from "../middlewares/auth"; 

import {
  generateProgram,
  getProgram,
  updateWeeklyProgression
} from "../controllers/program.controller";

const router = express.Router();

/**
 * @route   POST /api/program/generate
 */
router.post("/generate", auth, generateProgram); //  FIXed

/**
 * @route   GET /api/program/:programId
 */
router.get("/:programId", auth, getProgram); // optional but recommended

/**
 * @route   POST /api/program/update-week
 */
router.post("/update-week", auth, updateWeeklyProgression); // optional

export default router;
