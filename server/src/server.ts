import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './utils/db';
import authRoutes from './routes/auth.routes';
import paymentRoutes from './routes/payment.routes';
import { seedAdmins } from './utils/adminSeed';
import adminRoutes from './routes/admin.routes';
import eventRoutes from './routes/events.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedAdmins();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});