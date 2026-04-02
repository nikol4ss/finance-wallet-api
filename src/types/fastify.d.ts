import 'fastify';

import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string; email: string };
    user: { id: string; email: string };
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    startTime: number;
  }

  interface FastifyInstance {
    authenticate(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  }

  interface FastifyReply {
    success: (data: unknown) => FastifyReply;
    errorResponse: (message: string, statusCode?: number) => FastifyReply;
  }
}
