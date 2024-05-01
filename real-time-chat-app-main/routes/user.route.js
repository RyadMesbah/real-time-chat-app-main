import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  followUser,
  unfollowUser,
  getFollowers,
  add_expert,
  remove_expert,
  add_moderator,
  remove_moderator,
  bloquer_user,
  debloquer_user,
  getFollowing,
} from "../controllers/user.controller.js";
import {
  checkIfUserIsAdmin,
  checkIfUserIsBlocked,
  checkIfUserIsDeblocked,
  checkIfUserIsModerator,
  verifyToken,
} from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id", verifyToken, updateUser);
router.post("/users/:id/follow", verifyToken, followUser);
router.post("/users/:id/unfollow", verifyToken, unfollowUser);
router.get("/users/:id/followers", getFollowers);
router.get("/users/:id/following", getFollowing);
router.post(
  "/users/:id/add_expert",
  verifyToken,
  checkIfUserIsModerator,
  add_expert
);
router.post(
  "/users/:id/remove_expert",
  verifyToken,
  checkIfUserIsModerator,
  remove_expert
);
router.post(
  "/users/:id/add_moderator",
  verifyToken,
  checkIfUserIsAdmin,
  add_moderator
);
router.post(
  "/users/:id/remove_moderator",
  verifyToken,
  checkIfUserIsAdmin,
  remove_moderator
);
router.patch(
  "/users/:id/bloquer_user",
  verifyToken,
  checkIfUserIsModerator,
  checkIfUserIsDeblocked,
  bloquer_user
);
router.patch(
  "/users/:id/debloquer_user",
  verifyToken,
  checkIfUserIsModerator,
  checkIfUserIsBlocked,
  debloquer_user
);
export default router;
