import express from 'express';
import { createDiscussion, getSingleDiscussion } from '../controllers/discussions.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post("/", protectRoute, createDiscussion)
router.get("/:id", protectRoute, getSingleDiscussion)


export default router;