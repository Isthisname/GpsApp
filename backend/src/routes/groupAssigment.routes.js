import { Router } from "express";
import {User2group} from "../controller/groupAssignment.controller.js"

const router = Router()

router.post("/assignment/group", User2group);


export default router