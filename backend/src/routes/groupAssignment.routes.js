import { Router } from "express";
import {User2group, findUsersByGroup,removeUserFromGroup} from "../controller/groupAssignment.controller.js"

const router = Router()

router.post("/assignment/group", User2group);
router.get("/assignment/group/:group_id", findUsersByGroup);
router.delete("/assignment/group/:group_id/:user_id", removeUserFromGroup); 


export default router