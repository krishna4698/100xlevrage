import { Router } from "express";
import { register, Login } from "../controllers/auth.controller.js";
import cors from 'cors'
import express from 'express'
const app=express();
app.use(cors({origin:"http://localhost:3001/auth/register"}))
const router:Router= Router()

router.post("/register",register )
router.post("/login", Login)

export default router;