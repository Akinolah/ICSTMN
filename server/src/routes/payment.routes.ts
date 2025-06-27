import express from 'express';
import { verifyPaymentAndRegister } from '../controllers/payment.controller';

const router = express.Router();

router.post('/verify', verifyPaymentAndRegister);

export default router;