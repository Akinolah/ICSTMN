import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getAdminReports, loginAdmin } from '../controllers/admin.controller';
import { getEvents, createEvent, deleteEvent } from '../controllers/event.controller';
import { getResources, createResource, deleteResource } from '../controllers/resource.controller';
import { getUsers, deleteUser } from '../controllers/user.controller';
import { authMiddleware, superAdminOnly } from '../middleware/auth';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) {
  // Admin login (no auth)
  fastify.post('/login', loginAdmin);

  // Admin reports (super admin only)
  fastify.get('/reports', {
    preHandler: [authMiddleware, superAdminOnly]
  }, getAdminReports);

  // Events (admin or super admin)
  fastify.get('/events', { preHandler: [authMiddleware] }, getEvents);
  fastify.post('/events', { preHandler: [authMiddleware] }, createEvent);
  fastify.delete('/events/:id', { preHandler: [authMiddleware] }, deleteEvent);

  // Resources (admin or super admin)
  fastify.get('/resources', { preHandler: [authMiddleware] }, getResources);
  fastify.post('/resources', { preHandler: [authMiddleware] }, createResource);
  fastify.delete('/resources/:id', { preHandler: [authMiddleware] }, deleteResource);

  // User management (super admin only)
  fastify.get('/users', {
    preHandler: [authMiddleware, superAdminOnly]
  }, getUsers);
  fastify.delete('/users/:id', {
    preHandler: [authMiddleware, superAdminOnly]
  }, deleteUser);

  done();
}
