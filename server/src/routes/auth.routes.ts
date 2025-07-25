import { FastifyInstance } from 'fastify';
import { supabase } from '../services/supabase.service';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', async (request, reply) => {
    const { email, password, role } = request.body as {
      email: string;
      password: string;
      role?: 'user' | 'admin';
    };

    try {
      // 1. Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      // 2. Verify user role
      const userRole = data.user.user_metadata?.role || 'user';
      if (role && userRole !== role) {
        await supabase.auth.signOut();
        throw new Error(`Access denied: ${role} privileges required`);
      }

      // 3. Return necessary user data to frontend
      return reply.status(200).send({
        user: {
          id: data.user.id,
          email: data.user.email,
          role: userRole
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token
        }
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return reply.status(401).send({ message });
    }
  });
}