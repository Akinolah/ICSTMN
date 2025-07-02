import express from 'express';
import path from 'path';
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/dist')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedAdmins();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});