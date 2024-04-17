import { Router } from "express";
import { createGroup, findGroupByOwner, deleteGroup, updateGroup} from "../controller/group.controller.js";

const router = Router()

router.post("/group", createGroup);
router.get("/group/:owner_id", findGroupByOwner);
router.delete("/group/:group_id",  deleteGroup);
router.put("/group/:group_id",  updateGroup);






export default router