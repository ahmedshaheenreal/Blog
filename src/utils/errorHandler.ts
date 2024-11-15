import { NextFunction, Request, Response } from "express";
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
  DatabaseError as SequelizeDatabaseError,
} from "sequelize";
import Joi from "joi";
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof Joi.ValidationError) {
    res.status(400).json({ success: false, message: error.message });
  }
  // Handle Unique Constraint violations
  else if (error instanceof UniqueConstraintError) {
    res.status(409).json({
      message: "Conflict: Unique constraint violation",
      errors: error.errors,
    });
  } else if (error instanceof SequelizeValidationError) {
    res.status(422).json({
      message: "Validation error",
      errors: error.errors,
    });
  }
  // Handle general database errors
  else if (error instanceof SequelizeDatabaseError) {
    res.status(500).json({
      message: "Database error",
      error: error.message,
    });
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError"
  ) {
    res.status(403).json(error);
  } else {
    res.status(500).json({
      error,
    });
  }
};

export default errorHandler;
