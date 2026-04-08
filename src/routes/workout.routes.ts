import express from "express";
import {
  logExercise,
  getUserLogs,
  getSuggestedWeight
} from "../controllers/workout.controller";

const router = express.Router();

/**
 * @route   POST /api/workout/log
 * @desc    Log exercise performance
 */
router.post("/log", logExercise);

/**
 * @route   GET /api/workout/logs/:userId
 * @desc    Get all logs for a user (dashboard)
 */
router.get("/logs/:userId", getUserLogs);

/**
 * @route   POST /api/workout/suggest-weight
 * @desc    Get next suggested weight (progressive overload)
 */
router.post("/suggest-weight", getSuggestedWeight);

export default router;
