import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getLatestEvents } from '../controllers/event.controller';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get('/', getLatestEvents);
  done();
}