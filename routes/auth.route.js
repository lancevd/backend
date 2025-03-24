import express from "express";
import { register, check } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/regiser", register);
router.get("/check", check)



export default router;