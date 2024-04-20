import { Router } from "express";
import {createTask, findTaskByOwner, deleteTask, findTasksByTargetId,findTasksByGroup,updateTask} from "../controller/task.controller.js"

const router = Router()

router.post("/task", createTask);
router.get("/task/:owner_id", findTaskByOwner);
router.delete("/task/:task_id", deleteTask);
router.get("/mytasks/:target_id", findTasksByTargetId);
router.get("/tasks/group/:group_id", findTasksByGroup);
router.put("/task/:task_id", updateTask);

export default router 