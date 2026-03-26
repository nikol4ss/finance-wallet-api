import Fastify from "fastify";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { httpPlugin } from "./shared/http.js";

const app = Fastify({
  logger: false,
});

app.register(httpPlugin);
app.register(authRoutes, { prefix: "/auth" });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
