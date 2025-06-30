import { Router } from 'express';
import { login, precheckRegistration } from '../controllers/auth.controller';

const router = Router();

// router.post('/register', register);
router.post('/precheck', precheckRegistration);
router.post('/login', login);

export default router; 