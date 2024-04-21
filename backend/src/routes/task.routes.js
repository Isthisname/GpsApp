import { Router } from "express";
import {createTask, findTaskByOwner, deleteTask, findTasksByTargetId,findTasksByGroup,updateTask} from "../controller/task.controller.js"
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = Router()

router.post("/task", authenticateToken, createTask);
router.get("/task",authenticateToken, findTaskByOwner);
router.delete("/task/:task_id", deleteTask);
router.get("/mytasks", authenticateToken,findTasksByTargetId);
router.get("/tasks/group/:group_id", findTasksByGroup);
router.put("/task/:task_id", updateTask);

export default router 