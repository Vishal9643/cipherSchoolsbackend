import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (comment.userId === req.user.id || req.user.id === video.UserId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted");
    } else {
      return next(
        createError(403, "You are allowed to delete only your comments")
      );
    }
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
