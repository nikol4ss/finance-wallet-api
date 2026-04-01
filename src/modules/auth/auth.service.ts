import { eq } from 'drizzle-orm';
import { FastifyInstance } from 'fastify';
import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import { hashPassword, verifyPassword } from '../../utils/hashed.util.js';
import { SignInInput, SignUpInput } from './auth.schema.js';

export const AuthService = (_app: FastifyInstance) => ({
  signUp: async (data: SignUpInput) => {
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
          email: users.email,
          createdAt: users.createdAt,
        });

      return result[0];
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).cause?.code === '23505') {
        throw new Error('E-mail já cadastrado');
      }

      throw new Error('Erro ao criar usuário');
    }
  },

  signIn: async (data: SignInInput) => {
    const { email, password } = data;

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user.length) {
      throw new Error('Credenciais inválidas');
    }

    const foundUser = user[0];
    const isValid = await verifyPassword(password, foundUser.password);

    if (!isValid) {
      throw new Error('Credenciais inválidas');
    }

    return { id: foundUser.id, email: foundUser.email };
  },
});
