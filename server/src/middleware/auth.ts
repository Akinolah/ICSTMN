import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';

// Define the allowed roles only
interface DecodedToken {
  id: string;
  role: 'User' | 'Admin';
}

// General Auth Middleware – attach user to request
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ message: 'No or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    (request as any).user = decoded;
  } catch (error) {
    return reply.status(401).send({ message: 'Invalid token' });
  }
}

// Admin-Only Middleware
export async function adminOnly(request: FastifyRequest, reply: FastifyReply) {
  const user = (request as any).user as DecodedToken;

  if (user?.role === 'Admin') {
    return; // Access granted
  }

  return reply.status(403).send({ message: 'Forbidden: Admins only' });
}

// User-Only Middleware
export async function userOnly(request: FastifyRequest, reply: FastifyReply) {
  const user = (request as any).user as DecodedToken;

  if (user?.role === 'User') {
    return; // Access granted
  }

  return reply.status(403).send({ message: 'Forbidden: Users only' });
}
