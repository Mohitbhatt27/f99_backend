import { Request, Response } from "express";
import {
  createLog,
  getLogsByUser,
  getLastExerciseLog
} from "../repositories/workout.repository";
import { getNextWeight } from "../utils/progression.logic";


//  Log Exercise
export const logExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, programId, exerciseName, workoutDay, sets } = req.body;

    if (!userId || !programId || !exerciseName || !sets) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const log = await createLog({
      userId,
      programId,
      exerciseName,
      workoutDay,
      sets
      //  removed date (timestamps handles it)
    });

    res.status(201).json(log);
  } catch (error) {
    console.error("Log Exercise Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//  Get User Logs
export const getUserLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const logs = await getLogsByUser(userId);

    res.json(logs);
  } catch (error) {
    console.error("Get Logs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//  Get Suggested Weight
export const getSuggestedWeight = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, exerciseName } = req.body;

    const lastLog = await getLastExerciseLog(userId, exerciseName);

    if (!lastLog) {
      res.json({ suggestedWeight: null });
      return;
    }

    const nextWeight = getNextWeight(lastLog.sets);

    res.json({
      lastWeight: lastLog.sets[0].weight,
      suggestedWeight: nextWeight
    });
  } catch (error) {
    console.error("Suggested Weight Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
