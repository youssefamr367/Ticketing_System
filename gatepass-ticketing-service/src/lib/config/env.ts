import { resolve } from "node:path";
import { config } from "dotenv";
import { z } from "zod";

config({ path: resolve(__dirname, "../../../.env") });

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DB_HOST: z.string().nonempty(),
  DB_PORT: z.coerce.number().int().positive(),
  DB_USER: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_MIGRATIONS_DIR: z.string().nonempty().default("./migrations"),
  DB_MIGRATIONS_EXTENSION: z.string().nonempty().default("ts"),
  DB_POOL_MIN: z.coerce.number().int().nonnegative().default(0),
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
});

const parsed = envSchema.parse(process.env);

export const env = {
  PORT: parsed.PORT,
  NODE_ENV: parsed.NODE_ENV,
  db: {
    DB_HOST: parsed.DB_HOST,
    DB_PORT: parsed.DB_PORT,
    DB_USER: parsed.DB_USER,
    DB_PASSWORD: parsed.DB_PASSWORD,
    DB_NAME: parsed.DB_NAME,
    DB_MIGRATIONS_DIR: parsed.DB_MIGRATIONS_DIR,
    DB_MIGRATIONS_EXTENSION: parsed.DB_MIGRATIONS_EXTENSION,
    DB_POOL_MIN: parsed.DB_POOL_MIN,
    DB_POOL_MAX: parsed.DB_POOL_MAX,
  },
};
