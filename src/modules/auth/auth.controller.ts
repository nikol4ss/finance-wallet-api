import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { SignInSchema, SignUpSchema } from './auth.schema.js';
import { AuthService } from './auth.service.js';

export const authController = {
  signUp: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const service = AuthService(request.server);
      const user = SignUpSchema.parse(request.body);

      const createdUser = await service.signUp(user);
      return reply.status(201).send(createdUser);
    } catch (error: unknown) {
      request.log.error(error);

      if (error instanceof ZodError) {
        return reply.status(400).send({ error: error.issues });
      }

      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message });
      }

      return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
  },

  signIn: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const service = AuthService(request.server);
      const { email, password } = SignInSchema.parse(request.body);

      const user = await service.signIn({ email, password });
      const token = await reply.jwtSign({ id: user.id, email: user.email });

      return reply.send({ token });
    } catch (error: unknown) {
      request.log.error(error);

      if (error instanceof ZodError) {
        return reply.status(400).send({ error: error.issues });
      }

      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message });
      }

      return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
  },
};
