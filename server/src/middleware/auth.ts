import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../services/supabase.service';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
      role: 'user' | 'admin';
      status: string;
    };
  }
}

export async function verifyToken(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return reply.status(401).send({ message: 'No token provided' });
  }

  const { data, error } = await supabase.auth.getUser(token);
  
  if (error || !data.user) {
    return reply.status(401).send({ message: 'Invalid or expired token' });
  }

  request.user = {
    id: data.user.id,
    email: data.user.email!,
    role: data.user.user_metadata?.role || 'user',
    status: data.user.user_metadata?.status || 'active'
  };
};