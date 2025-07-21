import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getLatestEvents } from '../controllers/event.controller';

export default async function eventRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  // Full path will be /api/events due to prefix during registration
  fastify.get('/', async (request, reply) => {
    return getLatestEvents(request, reply);
  });
}
