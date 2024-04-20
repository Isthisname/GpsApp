import { Router } from "express";
import {updateUserStatus} from "../controller/user.controller.js";
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router()
// Update user position and status
router.patch('/user',authenticateToken, updateUserStatus);

export default router