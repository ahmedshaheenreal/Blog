import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
configDotenv();

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "");
    console.log(decoded);
    next();
  } catch (err) {
    next(err);
  }
}
