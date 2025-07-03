"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const admin_controller_1 = require("../controllers/admin.controller");
const event_controller_1 = require("../controllers/event.controller");
const resource_controller_1 = require("../controllers/resource.controller");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
function default_1(fastify, opts, done) {
    // Reports
    fastify.get('/reports', { preHandler: [auth_1.authMiddleware, auth_1.superAdminOnly] }, admin_controller_1.getAdminReports);
    // Events
    fastify.get('/events', { preHandler: [auth_1.authMiddleware] }, event_controller_1.getEvents);
    fastify.post('/events', { preHandler: [auth_1.authMiddleware] }, event_controller_1.createEvent);
    fastify.delete('/events/:id', { preHandler: [auth_1.authMiddleware] }, event_controller_1.deleteEvent);
    // Resources
    fastify.get('/resources', { preHandler: [auth_1.authMiddleware] }, resource_controller_1.getResources);
    fastify.post('/resources', { preHandler: [auth_1.authMiddleware] }, resource_controller_1.createResource);
    fastify.delete('/resources/:id', { preHandler: [auth_1.authMiddleware] }, resource_controller_1.deleteResource);
    // Users (super admin only)
    fastify.get('/users', { preHandler: [auth_1.authMiddleware, auth_1.superAdminOnly] }, user_controller_1.getUsers);
    fastify.delete('/users/:id', { preHandler: [auth_1.authMiddleware, auth_1.superAdminOnly] }, user_controller_1.deleteUser);
    done();
}
