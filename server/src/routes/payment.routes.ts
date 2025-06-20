import { Router } from 'express';
import { initializePayment } from '../controllers/payment.controller';

const router = Router();

router.post('/initialize', initializePayment);

export default router;