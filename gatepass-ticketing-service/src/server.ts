import { CreateApp } from "./app";
import { env } from "./lib/config/env";
import http from "http";

const app = CreateApp();
const server = http.createServer(app);
const PORT = env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
