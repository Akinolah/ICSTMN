import { Router } from 'express';
import { getAdminReports } from '../controllers/admin.controller';
import { getEvents, createEvent, deleteEvent } from '../controllers/event.controller';
import { getResources, createResource, deleteResource } from '../controllers/resource.controller';
import { getUsers, deleteUser } from '../controllers/user.controller';
import { authMiddleware, superAdminOnly } from '../middleware/auth';

const router = Router();

// Reports
router.get('/reports', authMiddleware, superAdminOnly, getAdminReports);

// Events
router.get('/events', authMiddleware, getEvents);
router.post('/events', authMiddleware, createEvent);
router.delete('/events/:id', authMiddleware, deleteEvent);

// Resources
router.get('/resources', authMiddleware, getResources);
router.post('/resources', authMiddleware, createResource);
router.delete('/resources/:id', authMiddleware, deleteResource);

// Users (super admin only)
router.get('/users', authMiddleware, superAdminOnly, getUsers);
router.delete('/users/:id', authMiddleware, superAdminOnly, deleteUser);

export default router;