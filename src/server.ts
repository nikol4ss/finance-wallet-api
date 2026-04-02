import jwt from '@fastify/jwt';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { authRoutes } from './modules/auth/auth.routes.js';
import { categoriesRoutes } from './modules/categories/categories.routes.js';
import { httpPlugin } from './shared/http.js';

const app = Fastify({ logger: false });

app.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'supersecret',
  sign: { expiresIn: '1d' },
});

app.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch {
    reply.status(401).send({ message: 'Não autorizado' });
  }
});

app.register(httpPlugin);
app.register(authRoutes, { prefix: '/auth' });
app.register(categoriesRoutes, { prefix: '/categories' });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
