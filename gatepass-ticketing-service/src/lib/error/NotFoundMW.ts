import type { RequestHandler } from "express";
import { AppError } from "./appError";

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
};