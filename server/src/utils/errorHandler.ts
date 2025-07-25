import { FastifyReply } from 'fastify';

export function errorHandler(error: unknown, reply: FastifyReply) {
  console.error(error);
  
  if (error instanceof Error) {
    const message = error.message;
    
    if (message.includes('Invalid login credentials')) {
      return reply.status(401).send({ message: 'Invalid email or password' });
    }
    if (message.includes('Access denied')) {
      return reply.status(403).send({ message });
    }
    
    return reply.status(400).send({ message });
  }

  reply.status(500).send({ message: 'Internal server error' });
}