import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/Comment.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", verifyToken, getComment);

export default router;
