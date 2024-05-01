import express from "express";
import {
  approveRoom,
  requestCreateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  requestCreateRoom,
  updateRoom,
} from "../controllers/room.controller.js";

import {
  checkIfUserIsAdmin,
  checkIfUserIsExpert,
  checkIfUserIsModerator,
  verifyToken,
} from "../middleware/jwt.js";

const router = express.Router();

router.get("/rooms", verifyToken, getRooms);
router.get("/rooms/:id", verifyToken, getRoom);
router.post("/rooms", verifyToken, requestCreateRoom);
router.patch("/rooms/:id", verifyToken, updateRoom);
router.delete("/rooms/:id", verifyToken, deleteRoom);
router.post(
  "/rooms/approveRoom",
  verifyToken,
  checkIfUserIsExpert,
  approveRoom
);

export default router;
