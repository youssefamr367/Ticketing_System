import knex from "knex";
import { env } from "../config/env";


export const knexConfig = {
    client: "pg",
    connection: {
        host: env.db.DB_HOST,
        port: env.db.DB_PORT,
        user: env.db.DB_USER,
        password: env.db.DB_PASSWORD,
        database: env.db.DB_NAME,
    },
    pool: { min: env.db.DB_POOL_MIN, max: env.db.DB_POOL_MAX },
    migrations: {
        directory: env.db.DB_MIGRATIONS_DIR,
        extension: env.db.DB_MIGRATIONS_EXTENSION,
    },
};
