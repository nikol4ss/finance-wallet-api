import { FastifyInstance } from 'fastify';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

export async function categoriesRoutes(app: FastifyInstance) {
  const service = CategoriesService(app);
  const controller = CategoriesController(service);

  app.addHook('onRequest', app.authenticate);

  app.get('/', controller.findAll);
  app.get('/:id', controller.findById);
  app.post('/', controller.create);
  app.patch('/:id', controller.update);
  app.delete('/:id', controller.delete);
}
