import { Router } from "express";
import {createTask, findTaskByOwner} from "../controller/task.controller.js"

const router = Router()

router.post("/task", createTask);
router.get("/task/:owner_id", findTaskByOwner);


export default router