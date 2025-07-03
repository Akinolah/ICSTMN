import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { login, precheckRegistration } from '../controllers/auth.controller';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.post('/precheck', precheckRegistration);
  fastify.post('/login', login);
  done();
}