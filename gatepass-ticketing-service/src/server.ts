import { CreateApp } from "./app";
import { env } from "./lib/config/env";
import { db } from "./lib/database/knex";
import { logger } from "./lib/logger/logger";
import http from "http";

const app = CreateApp();
const server = http.createServer(app);
const PORT = env.PORT;

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

let isShuttingDown = false;

async function shutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info(`Received ${signal}. Shutting down...`);

  const forceExit = setTimeout(() => {
    logger.error("Graceful shutdown timed out");
    process.exit(1);
  }, 10_000);

  forceExit.unref();

  try {
    // Stop accepting new requests and wait for active requests.
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Close PostgreSQL connection pool.
    await db.destroy();

    clearTimeout(forceExit);
    logger.info("Server shut down successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Shutdown failed", {
      error: error instanceof Error ? error.message : String(error),
    });

    clearTimeout(forceExit);
    process.exit(1);
  }
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));