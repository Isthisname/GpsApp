import { Router } from "express";
import {task, findTaskByOwner} from "../controller/task.controller.js"

const router = Router()

router.post("/task", task);
router.get("/task/:owner_id", findTaskByOwner);


export default router