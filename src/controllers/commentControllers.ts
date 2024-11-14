import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.content.trim()?.length < 2) {
      res.status(400).json({
        success: false,
        message: "Too short comment",
      });
    }
    const comment = await Comment.create({
      content: req.body.content,
      userUserId: req.body.userUserId,
      postPostId: req.body.postPostId,
    });
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      body: comment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByPk(req.params.postId, {
      include: [
        {
          model: Comment,
        },
      ],
    });
    if (!post) {
      res.status(404).json({
        success: false,
        message: "no posts found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "post with all categories retrieved successfully!",
      body: post,
    });
  } catch (error) {
    next(error);
  }
};
