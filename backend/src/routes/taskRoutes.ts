import { Router } from "express";
import {
  addTask,
  getTasks,
  deleteTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/tasks", addTask);
router.get("/tasks", getTasks);
router.delete("/tasks/:id", deleteTask);

export default router;
