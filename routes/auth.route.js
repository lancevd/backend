import express from "express";
import { checkAuth, login, logout, register } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.post("/logout", logout)
router.get("/check", protectRoute, checkAuth)



export default router;