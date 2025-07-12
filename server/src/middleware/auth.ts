import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';

// Define a user interface for the decoded token
interface DecodedToken {
  id: string;
  role: 'User' | 'Admin' | 'Super Admin';
}

// Auth middleware: attach decoded user to request
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ message: 'No or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    (request as any).user = decoded; // Attach decoded user to request
  } catch {
    return reply.status(401).send({ message: 'Invalid token' });
  }
}

// Super Admin Only Middleware
export async function superAdminOnly(request: FastifyRequest, reply: FastifyReply) {
  const user = (request as any).user as DecodedToken;

  if (user && user.role === 'Super Admin') {
    return; // Allowed
  } else {
    return reply.status(403).send({ message: 'Forbidden: Super Admins only' });
  }
}

// Admin OR Super Admin Middleware
export async function adminOnly(request: FastifyRequest, reply: FastifyReply) {
  const user = (request as any).user as DecodedToken;

  if (user && (user.role === 'Admin' || user.role === 'Super Admin')) {
    return; // Allowed
  } else {
    return reply.status(403).send({ message: 'Forbidden: Admins only' });
  }
}
