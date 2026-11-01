import express from "express";
import helmet from "helmet";
import cors from "cors";
import CookieParser from "cookie-parser";
import { routes } from "./routes";
import { errorHandler } from "./lib/error/ErrorMW";
import { notFoundHandler } from "./lib/error/NotFoundMW";

export function CreateApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(CookieParser());
  //app.use(correlationId);
  app.use("/api", routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
