import knex from "knex";
import { knexConfig } from "./knexConfig";

export const db = knex(knexConfig);

export async function pingDatabase(): Promise<void> {
  return db
    .raw("SELECT 1")
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      throw error;
    });
}
