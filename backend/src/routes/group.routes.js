import { Router } from "express";
import { createGroup, findGroupByOwner, deleteGroup, updateGroup} from "../controller/group.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/group", authenticateToken,createGroup);
router.get("/group",authenticateToken, findGroupByOwner);
router.delete("/group/:group_id",  deleteGroup);
router.put("/group/:group_id",  updateGroup);






export default router