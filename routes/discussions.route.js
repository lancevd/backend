import express from 'express';
import { createDiscussion } from '../controllers/discussions.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post("/", protectRoute, createDiscussion)


export default router;