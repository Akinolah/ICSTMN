import { FastifyInstance } from 'fastify';
import { verifyToken } from '../middleware/auth';
import { AdminController } from '../controllers/admin.controller';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', verifyToken);
  
  fastify.get('/admin/dashboard', async (request, reply) => {
    if (request.user?.role !== 'admin') {
      return reply.status(403).send({ message: 'Admin access required' });
    }
    return { message: 'Welcome to admin dashboard' };
  });

  fastify.get('/admin/reports', AdminController.getAdminReports);
}