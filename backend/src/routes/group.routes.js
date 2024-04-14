import { Router } from "express";
import { createGroup, findGroupByOwner} from "../controller/group.controller.js";

const router = Router()

router.post("/group", createGroup);
router.get("/group/:owner_id", findGroupByOwner);
//router.put("/gropup");




export default router