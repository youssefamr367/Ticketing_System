import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "../error/appError";

export async function validateBody<T extends object>(
  cls: new () => T,
  body: unknown,
): Promise<T> {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    throw new AppError("Invalid venue data", 400);
  }

  const instance = plainToInstance(cls, body);
  const errors = await validate(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    throw new AppError("Invalid venue data", 400);
  }
  return instance;
}
