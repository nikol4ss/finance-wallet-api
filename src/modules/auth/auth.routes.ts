import { FastifyInstance } from "fastify";
import { authController } from "./auth.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signup", authController.signIn,);
}

