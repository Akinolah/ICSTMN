import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getAdminReports } from '../controllers/admin.controller';
import { getEvents, createEvent, deleteEvent } from '../controllers/event.controller';
import { getResources, createResource, deleteResource } from '../controllers/resource.controller';
import { getUsers, deleteUser } from '../controllers/user.controller';
import { authMiddleware, superAdminOnly } from '../middleware/auth';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) {
  // Reports
  fastify.get('/reports', { preHandler: [authMiddleware, superAdminOnly] }, getAdminReports);

  // Events
  fastify.get('/events', { preHandler: [authMiddleware] }, getEvents);
  fastify.post('/events', { preHandler: [authMiddleware] }, createEvent);
  fastify.delete('/events/:id', { preHandler: [authMiddleware] }, deleteEvent);

  // Resources
  fastify.get('/resources', { preHandler: [authMiddleware] }, getResources);
  fastify.post('/resources', { preHandler: [authMiddleware] }, createResource);
  fastify.delete('/resources/:id', { preHandler: [authMiddleware] }, deleteResource);

  // Users (super admin only)
  fastify.get('/users', { preHandler: [authMiddleware, superAdminOnly] }, getUsers);
  fastify.delete('/users/:id', { preHandler: [authMiddleware, superAdminOnly] }, deleteUser);

  done();
}