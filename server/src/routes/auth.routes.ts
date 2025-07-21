// src/routes/auth.routes.ts
import { FastifyInstance } from 'fastify';
import { login } from '../controllers/auth.controller';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/api/auth/login', login);
}
