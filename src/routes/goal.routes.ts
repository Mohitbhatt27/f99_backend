import { Router } from "express";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../controllers/goal.controller";
import auth from "../middlewares/auth";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = Router();

router.get("/", auth, asyncHandler(getGoals));
router.post("/", auth, asyncHandler(createGoal));
router.patch("/:id", auth, asyncHandler(updateGoal));
router.delete("/:id", auth, asyncHandler(deleteGoal));

export default router;
