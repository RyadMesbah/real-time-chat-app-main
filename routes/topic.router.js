import express from "express";
import {
  createTopic,
  deleteTopic,
  getTopic,
  getTopics,
  updateTopic,
} from "../controllers/topic.controller.js";

import {
  checkIfUserIsAdmin,
  checkIfUserIsExpert,
  checkIfUserIsModerator,
  verifyToken,
} from "../middleware/jwt.js";

const router = express.Router();
router.get("/topics", verifyToken, getTopics);
router.get("/topics/:id", verifyToken, getTopic);
router.post("/topics", verifyToken, checkIfUserIsExpert, createTopic);
router.patch("/topics/:id", verifyToken, checkIfUserIsExpert, updateTopic);
router.delete("/topics/:id", verifyToken, checkIfUserIsExpert, deleteTopic);

export default router;
