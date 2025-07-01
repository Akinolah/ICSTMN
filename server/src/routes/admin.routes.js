"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const event_controller_1 = require("../controllers/event.controller");
const resource_controller_1 = require("../controllers/resource.controller");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Reports
router.get('/reports', auth_1.authMiddleware, auth_1.superAdminOnly, admin_controller_1.getAdminReports);
// Events
router.get('/events', auth_1.authMiddleware, event_controller_1.getEvents);
router.post('/events', auth_1.authMiddleware, event_controller_1.createEvent);
router.delete('/events/:id', auth_1.authMiddleware, event_controller_1.deleteEvent);
// Resources
router.get('/resources', auth_1.authMiddleware, resource_controller_1.getResources);
router.post('/resources', auth_1.authMiddleware, resource_controller_1.createResource);
router.delete('/resources/:id', auth_1.authMiddleware, resource_controller_1.deleteResource);
// Users (super admin only)
router.get('/users', auth_1.authMiddleware, auth_1.superAdminOnly, user_controller_1.getUsers);
router.delete('/users/:id', auth_1.authMiddleware, auth_1.superAdminOnly, user_controller_1.deleteUser);
exports.default = router;
