// Register TypeScript support for the Knex CLI and .ts migration files.
require("tsx/cjs");

// Reuse the same validated environment and PostgreSQL settings as the app.
const { knexConfig } = require("./src/lib/database/knexConfig.ts");

module.exports = {
  development: knexConfig,
  test: knexConfig,
  production: knexConfig,
};
