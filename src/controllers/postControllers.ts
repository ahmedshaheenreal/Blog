import { Request, Response, NextFunction } from "express";
import { Comment, Post } from "../models";
import Joi from "joi";
import checkUser from "../utils/userCheck";
import Category from "../models/Category";
import User from "../models/User";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const sceretKey = process.env.SECRET_KEY || "secret";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      content: Joi.string().min(1).max(500).required(),
      userUserId: Joi.string(),
    });
    const { error, value } = schema.validate({
      title: req.body.title,
      content: req.body.content,
      userUserId: req.body.userUserId,
    });
    // throw validation error

    if (error) throw error;
    checkUser(req, res, next);
    const newPost = await Post.create(value);
    res.status(201).json({
      success: true,
      message: "post created successfully!",
      body: newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getOnePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findOne({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
        {
          model: Category,
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "post retrieved successfully!",
      body: post,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await Post.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    if (deleted === 0) {
      res.status(400).json({
        success: false,
        message: "Post not found",
      });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required().optional(),
      content: Joi.string().min(1).max(500).required().optional(),
      userUserId: Joi.string().optional(),
    });
    const { error, value } = schema.validate({
      ...req.body,
    });
    if (error) throw error;
    const user = await Post.update(value, {
      where: {
        Post_id: req.params.id,
      },
    });

    res.status(200).json({ ...value });
  } catch (error) {
    next(error);
  }
};
export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
        {
          model: Category,
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "all posts retrieved successfully!",
      body: posts,
    });
  } catch (error) {
    next(error);
  }
};

export async function authPost(
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
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }
    const decode = jwt.verify(token, sceretKey) as jwt.JwtPayload;
    //check if the user id in the token equals user id in req.params
    //check if the user id in the token equals user id in req.params
    console.log("THis is decode token: ", decode.id);
    console.log("THis is user: ", post.dataValues.userUserId);

    if (post.dataValues.userUserId !== decode.id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
}
export async function authCreatePost_Comment(
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
    // const post = await Post.findByPk(req.params.id);

    const decode = jwt.verify(token, sceretKey) as jwt.JwtPayload;
    //check if the user id in the token equals user id in req.params
    //check if the user id in the token equals user id in req.params
    console.log("THis is decode token: ", decode.id);
    console.log("THis is user: ", req.body.userUserId);

    if (req.body.userUserId !== decode.id) {
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
