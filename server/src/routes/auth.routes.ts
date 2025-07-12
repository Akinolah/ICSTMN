import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { loginUser, precheckRegistration, registerUser } from '../controllers/auth.controller';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) {
  // Precheck if email exists before registration
  fastify.post('/precheck', precheckRegistration);

  // User registration
  fastify.post('/register', registerUser);

  // User login
  fastify.post('/login', loginUser);

  done();
}
