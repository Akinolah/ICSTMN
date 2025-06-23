import { Router } from 'express';
import { getAdminReports } from '../controllers/admin.controller';
import { authMiddleware, superAdminOnly } from '../middleware/auth';

const router = Router();

router.get('/reports', authMiddleware, superAdminOnly, getAdminReports);

export default router;