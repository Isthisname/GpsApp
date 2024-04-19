import { Router } from "express";
import {User2group, findUsersByGroup} from "../controller/groupAssignment.controller.js"

const router = Router()

router.post("/assignment/group", User2group);
router.get("/assignment/group/:group_id", findUsersByGroup);


export default router