console.log('Starting Fastify server...');

import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './utils/db';
import { seedAdmins } from './utils/adminSeed';
import authRoutes from './routes/auth.routes';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';
import eventRoutes from './routes/events.routes';

dotenv.config();

const fastify = Fastify({ logger: true });

// Register CORS
fastify.register(fastifyCors, {
  origin: ['https://icstmn.onrender.com'],
  credentials: true
});

// Register API routes
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(paymentRoutes, { prefix: '/api/payments' });
fastify.register(adminRoutes, { prefix: '/api/admin' });
fastify.register(eventRoutes, { prefix: '/api/events' });

// Serve static files
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../../client/dist'),
  prefix: '/',
});

// Wildcard route for SPA (serves index.html for all unmatched routes)
fastify.setNotFoundHandler((req, reply) => {
  reply.sendFile('index.html');
});

const PORT = Number(process.env.PORT) || 5000;

const start = async () => {
  try {
    await connectDB();
    await seedAdmins();
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();