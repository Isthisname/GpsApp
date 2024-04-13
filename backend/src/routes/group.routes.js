import { Router } from "express";
import { createGroup } from "../controller/group.controller";

const router = Router()

router.post("/gropup", createGroup);
router.get("/gropup/:owner_id", findGroupByOwner);
//router.put("/gropup");




export default router