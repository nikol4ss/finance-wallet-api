import { FastifyInstance } from "fastify";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { hashPassword } from "../../utils/hashed.util.js";
import { SignInSchema } from "./auth.schema.js";

export const AuthService = (app: FastifyInstance) => ({
  singUp: async (data: SignInSchema) => {
    const hashed = await hashPassword(data.password);

    try {
      const result = await db
        .insert(users)
        .values({
          email: data.email,
          password: hashed,
        })
        .returning({
          id: users.id,
          values: users.email,
          createdAt: users.createdAt,
        });

      return result[0];
    } catch (error: any) {
      if (error.cause?.code === "23505") {
        throw new Error("E-mail já cadastrado");
      }

      throw new Error("Erro ao criar usuário: " + error.message);
    }
  },
});
