import { FastifyReply, FastifyRequest } from 'fastify';
import { CategoriesSchemas, CategoriesUpdateSchema } from './categories.schemas';
import { CategoriesService } from './categories.service';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.string().uuid('ID inválido'),
});

export const CategoriesController = (service: ReturnType<typeof CategoriesService>) => ({
  async findAll(req: FastifyRequest, reply: FastifyReply) {
    const categories = await service.findAll(req.user.id);
    return reply.send(categories);
  },

  async findById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = paramsSchema.parse(req.params);
    const category = await service.findById(req.user.id, id);

    if (!category) {
      return reply.status(404).send({ message: 'Categoria não encontrada' });
    }

    return reply.send(category);
  },

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = CategoriesSchemas.parse(req.body);
    const category = await service.create(req.user.id, data);
    return reply.status(201).send(category);
  },

  async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = paramsSchema.parse(req.params);
    const data = CategoriesUpdateSchema.parse(req.body);
    const updated = await service.update(req.user.id, id, data);

    if (!updated) {
      return reply.status(404).send({ message: 'Categoria não encontrada' });
    }

    return reply.send(updated);
  },

  async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = paramsSchema.parse(req.params);
    const deleted = await service.delete(req.user.id, id);

    if (!deleted) {
      return reply.status(404).send({ message: 'Categoria não encontrada' });
    }

    return reply.status(204).send();
  },
});
