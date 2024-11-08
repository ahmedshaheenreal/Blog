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
  // Handle Unique Constraint violations
  if (error instanceof Joi.ValidationError) {
    res.status(400).json({ success: false, message: error.message });
  } else if (error instanceof UniqueConstraintError) {
    res.status(409).json({
      message: "Conflict: Unique constraint violation",
      errors: error.errors, // Specific errors related to the unique constraint
    });
  }
  // Handle Sequelize validation errors
  else if (error instanceof SequelizeValidationError) {
    res.status(422).json({
      message: "Validation error",
      errors: error.errors, // Detailed validation errors
    });
  }
  // Handle general database errors
  else if (error instanceof SequelizeDatabaseError) {
    res.status(500).json({
      message: "Database error",
      error: error.message,
    });
  } else {
    res.status(500).json({
      message: " error",
      error: error.message,
    });
  }
};

export default errorHandler;
