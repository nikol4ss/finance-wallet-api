import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    startTime: number;
  }

  interface FastifyReply {
    success: (data: unknown) => FastifyReply;
    errorResponse: (message: string, statusCode?: number) => FastifyReply;
  }
}
