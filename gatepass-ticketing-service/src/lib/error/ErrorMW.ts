import type { ErrorRequestHandler } from "express";
import { AppError } from "./appError";
import { logger } from "../logger/logger";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req,
  res,
  next,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const isOperational = err instanceof AppError && err.isOperational;
  const statusCode = isOperational ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : "Unknown error";

  logger.error(message, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err instanceof Error ? err.stack : undefined,
  });

  if (isOperational) {
    res.status(statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};