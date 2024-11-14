import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createToken from "../utils/createToken";
import { configDotenv } from "dotenv";
import Joi from "joi";
configDotenv();

const secret = process.env.SECRET_KEY;
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check for a valid token and if they are logged in
    const token = req.headers.authorization?.split(" ")[1] || "";
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    ) as jwt.JwtPayload;
    //respond that they are already logged in
    if (decoded) {
      res.status(409).json({
        message: "You are already logged in.",
      });

      return;
    }
  } catch (err) {
    // validate the user input
    const schema = Joi.object({
      username: Joi.string().min(5).max(16).required(),
      password: Joi.string().min(8).max(20).required(),
    });
    const { error, value } = schema.validate({
      username: req.body.username,
      password: req.body.password,
    });

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    //underneath is the logic of not already logged in user
    const user = await User.findOne({
      where: {
        username: value.username,
      },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "incorrect username",
      });
      return;
    }

    const theUser = { ...user.dataValues };
    //check password
    bcrypt.compare(value.password, user.dataValues.password, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      if (result) {
        const token = createToken(
          {
            password: theUser.passord,
            username: theUser.username,
            email: theUser.email,
          },
          secret || ""
        );
        res.status(201).json({
          message: "You are logged in",
          token,
        });
        return;
      } else {
        res.status(400).send("incorrect password");
        return;
      }
    });
  }
};
