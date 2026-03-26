import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export const httpPlugin = fp(async (app: FastifyInstance) => {
  app.addHook("onRequest", async (request: FastifyRequest) => {
    (request as any).startTime = Date.now();
  });

  app.addHook(
    "onResponse",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const startTime = (request as any).startTime;

      const time = startTime ? Date.now() - startTime : -1;

      const method = request.method;
      const url = request.routeOptions?.url || request.url;
      const status = reply.statusCode;

      console.log(`[${method}] ${url} ${status} ${time}ms`);
    },
  );

  app.decorateReply("success", function (this: FastifyReply, data: unknown) {
    return this.send({ success: true, data });
  });

  app.decorateReply(
    "errorResponse",
    function (this: FastifyReply, message: string, statusCode = 400) {
      return this.status(statusCode).send({
        success: false,
        error: message,
      });
    },
  );

  app.setErrorHandler((error, request, reply) => {
    const err = error as { message?: string; statusCode?: number };

    reply.status(err.statusCode || 500).send({
      success: false,
      error: err.message || "Internal server error",
    });
  });
});
