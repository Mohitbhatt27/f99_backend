import { Request, Response, NextFunction } from "express";
import Goal from "../models/goal.model";

/**
 * GET /api/v1/goals
 * Returns all goals for the logged-in user.
 */
export const getGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.userId;
    const goals = await Goal.find({ user: userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/goals
 * Body: { title, current, target, unit }
 */
export const createGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.userId;
    const { title, current, target, unit } = req.body;

    if (!title?.trim()) {
      res.status(400).json({ message: "Title is required." });
      return;
    }
    if (target === undefined || target <= 0) {
      res.status(400).json({ message: "Target must be a positive number." });
      return;
    }

    const goal = await Goal.create({
      user: userId,
      title: title.trim(),
      current: Number(current) || 0,
      target: Number(target),
      unit: unit?.trim() ?? "",
    });

    res.status(201).json({ message: "Goal created.", goal });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/v1/goals/:id
 * Body: { title?, current?, target?, unit? }
 */
export const updateGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { title, current, target, unit } = req.body;

    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = title.trim();
    if (current !== undefined) updates.current = Number(current);
    if (target !== undefined) updates.target = Number(target);
    if (unit !== undefined) updates.unit = unit.trim();

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ message: "Nothing to update." });
      return;
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!goal) {
      res.status(404).json({ message: "Goal not found." });
      return;
    }

    res.json({ message: "Goal updated.", goal });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/v1/goals/:id
 */
export const deleteGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const goal = await Goal.findOneAndDelete({ _id: id, user: userId });

    if (!goal) {
      res.status(404).json({ message: "Goal not found." });
      return;
    }

    res.json({ message: "Goal deleted." });
  } catch (err) {
    next(err);
  }
};
