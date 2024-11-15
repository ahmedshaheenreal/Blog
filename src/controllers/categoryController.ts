import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import Category from "../models/Category";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const sceretKey = process.env.SECRET_KEY || "secret";

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

export async function authCreateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!token) {
      res.status(403).json({
        message: "Please Log in",
        success: false,
      });
      return;
    }
    const post = await Post.findByPk(req.params.postId);

    const decode = jwt.verify(token, sceretKey) as jwt.JwtPayload;
    //check if the user id in the token equals user id in req.params
    //check if the user id in the token equals user id in req.params
    console.log("THis is decode token: ", decode.id);
    console.log("THis is user: ", post?.dataValues.userUserId);
    if (post?.dataValues.userUserId !== decode.id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
}
