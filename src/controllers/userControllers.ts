import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Joi from "joi";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(5).max(16).required(),
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

    const newUser = await User.create({
      username: value.username,
      email: value.email,
      password: value.password,
    });

    res.status(201).json({ success: true, newUser });
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
    res.status(200).json(usersList);
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

    res.status(204).send();
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

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
