import express from "express";
import helmet from "helmet";
import cors from "cors";
import CookieParser from "cookie-parser";
import { routes } from "./routes";

export function CreateApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(CookieParser());
  //app.use(correlationId);
  app.use("/api", routes);
  //app.use(errorHandler);

  return app;
  return app;
}
