import express from "express"
import {register, login, userData} from "../controllers/auth.js";
import verifyToken from '../middlewares/auth.js';

const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.post("/user", verifyToken, userData)

export default router