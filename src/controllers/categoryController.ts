import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import Category from "../models/Category";

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = (await Post.findByPk(req.params.postId)) as any;
    const [object, isExists] = await Category.findOrCreate({
      where: {
        name: req.body.name,
      },
      defaults: {
        name: req.body.name,
      },
    });
    await post.addCategory(object);

    res.status(201).json({
      success: true,
      message: "Category added for post " + post?.title,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByPk(req.params.postId, {
      include: [
        {
          model: Category,
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
