import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';

// Auth middleware for Fastify
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const auth = request.headers.authorization;
  if (!auth) {
    reply.status(401).send({ message: 'No token' });
    return;
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (request as any).user = decoded;
  } catch {
    reply.status(401).send({ message: 'Invalid token' });
    return;
  }
}

// Super admin only middleware for Fastify
export async function superAdminOnly(request: FastifyRequest, reply: FastifyReply) {
  const user = (request as any).user;
  if (user && user.isAdmin && user.adminIndex === 0) {
    // allowed
    return;
  } else {
    reply.status(403).send({ message: 'Forbidden' });
    return;
  }
}