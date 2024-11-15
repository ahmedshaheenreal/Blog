import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Joi from "joi";
import createToken from "../utils/createToken";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Model } from "sequelize";

configDotenv();
const sceretKey = process.env.SECRET_KEY || "secret";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(5).max(16).required(),
      password: Joi.string().min(8).max(20).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    const { error, value } = schema.validate({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      throw error;
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(value.password, salt);
    console.log(hashedPassword);
    const newUser = await User.create({
      username: value.username,
      email: value.email,
      password: hashedPassword,
    });
    console.log("new User : ", newUser);
    const token = createToken(
      {
        ...value,
        id: newUser.dataValues.user_id,
        password: hashedPassword,
      },
      sceretKey
    );

    res.status(201).json({ success: true, message: "user created!", token });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersList = await User.findAll();
    res.status(200).json({
      success: true,
      message: "All users retrieved successfully!",
      body: usersList,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //if prev check is ok, find the user
    const user = await User.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "user name not found, please provide a correct id",
      });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ID PUT /:userId: Update

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || !req.params.id) {
      res.status(400).json({
        success: false,
        message: "Please check request body and the provided id",
      });
      return;
    }
    const user = await User.update(
      {
        ...req.body,
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );
    const updatedUser = await User.findByPk(req.params.id);
    const token = createToken(
      {
        id: updatedUser?.dataValues.user_id,
        username: updatedUser?.dataValues.username,
        email: updatedUser?.dataValues.email,
        password: updatedUser?.dataValues.password,
      },
      sceretKey
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

//Delete User

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: "Please check the provided id",
      });
      return;
    }
    const user = await User.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    //generate token

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
//TO-DO:-- make sure that the old tokens after update or delete won't work
export async function authUser(
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
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
      return;
    }
    const decode = jwt.verify(token, sceretKey) as jwt.JwtPayload;
    //check if the user id in the token equals user id in req.params
    //check if the user id in the token equals user id in req.params
    console.log("THis is decode: ", decode.id);
    console.log("THis is params: ", req.params.id);

    if (req.params.id !== decode.id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
}
