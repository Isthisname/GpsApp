import { Router } from "express";
import {updateUserStatus,findAllUsers} from "../controller/user.controller.js";
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router()
// Update user position and status
router.patch('/user',authenticateToken, updateUserStatus);
router.get('/user',authenticateToken, findAllUsers);

export default router