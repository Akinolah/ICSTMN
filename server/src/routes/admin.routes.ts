import { FastifyInstance } from 'fastify';
import { isAuthenticated, isAdmin } from '../middleware/auth';

export default async function adminRoutes(fastify: FastifyInstance) {
  fastify.get('/admin-only', { preHandler: [isAuthenticated, isAdmin] }, async (req, reply) => {
    return { message: 'Welcome Admin!' };
  });
}










// import { FastifyInstance, FastifyPluginOptions } from 'fastify';
// import { getAdminReports, loginAdmin } from '../controllers/admin.controller';
// import { getEvents, createEvent, deleteEvent } from '../controllers/event.controller';
// import { getResources, createResource, deleteResource } from '../controllers/resource.controller';
// import { getUsers, deleteUser } from '../controllers/user.controller';
// import { authMiddleware, adminOnly } from '../middleware/auth';

// export default function (
//   fastify: FastifyInstance,
//   opts: FastifyPluginOptions,
//   done: () => void
// ) {
//   // Admin login (public)
//   fastify.post('/login', loginAdmin);

//   // Admin reports (admin only)
//   fastify.get('/reports', {
//     preHandler: [authMiddleware, adminOnly]
//   }, getAdminReports);

//   // Events management (admin only)
//   fastify.get('/events', { preHandler: [authMiddleware, adminOnly] }, getEvents);
//   fastify.post('/events', { preHandler: [authMiddleware, adminOnly] }, createEvent);
//   fastify.delete('/events/:id', { preHandler: [authMiddleware, adminOnly] }, deleteEvent);

//   // Resources management (admin only)
//   fastify.get('/resources', { preHandler: [authMiddleware, adminOnly] }, getResources);
//   fastify.post('/resources', { preHandler: [authMiddleware, adminOnly] }, createResource);
//   fastify.delete('/resources/:id', { preHandler: [authMiddleware, adminOnly] }, deleteResource);

//   // User management (admin only)
//   fastify.get('/users', {
//     preHandler: [authMiddleware, adminOnly]
//   }, getUsers);
//   fastify.delete('/users/:id', {
//     preHandler: [authMiddleware, adminOnly]
//   }, deleteUser);

//   done();
// }
