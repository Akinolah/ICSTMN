import { Router } from 'express';
import { getLatestEvents } from '../controllers/event.controller';

const router = Router();

router.get('/', getLatestEvents);

export default router;