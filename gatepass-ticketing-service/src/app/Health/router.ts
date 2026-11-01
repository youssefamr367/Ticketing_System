import { Router } from "express";
import { pingDatabase } from "../../lib/database/knex";

export const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  try {
    await pingDatabase();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Database connection failed" });
  }
});
