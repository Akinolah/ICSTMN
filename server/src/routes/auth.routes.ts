import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { loginUser, precheckRegistration } from '../controllers/auth.controller';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.post('/precheck', precheckRegistration); // Check email before registration
  fastify.post('/login', loginUser); // Handle user login
  done();
}
