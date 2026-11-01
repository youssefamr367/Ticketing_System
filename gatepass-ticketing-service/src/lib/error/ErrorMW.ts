import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";
import { logger } from "../logger/logger";

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = err.statusCode;
  const operational = err.isOperational;

  logger.error(err.message, {
    statusCode: err.statusCode,
    stack: err.stack,
    operational: operational,
    body: req.body,
  });

  if (operational) {
    res.status(statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).json({
    error: "Something went wrong",
  });
}
