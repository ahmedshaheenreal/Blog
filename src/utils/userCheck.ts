import User from "../models/User";
import { Request, Response, NextFunction } from "express";

export default async function checkUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const theUser = await User.findOne({
    where: {
      user_id: req.body.userUserId,
    },
  });

  if (!theUser) {
    console.log("We are here", theUser);
    res
      .status(400)
      .json({ success: false, message: "No user with this id found" });
    return;
  }
  return;
}
