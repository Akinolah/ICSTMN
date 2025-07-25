import Fastify from 'fastify';
import cors from '@fastify/cors';
import { authRoutes } from './routes/auth.routes';
import { adminRoutes } from './routes/admin.routes';
import { preRegistrationRoutes } from './routes/preregistration.routes';
import { paymentRoutes } from './routes/payment.routes';
import { config } from './utils/config';

const fastify = Fastify({ logger: true });

// Middleware
fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});

// Routes
fastify.register(authRoutes, { prefix: '/auth' });
fastify.register(adminRoutes, { prefix: '/admin' });
fastify.register(preRegistrationRoutes, { prefix: '' });
fastify.register(paymentRoutes, { prefix: '' });

const start = async () => {
  try {
    await fastify.listen({ 
      port: config.port,
      host: '0.0.0.0'
    });
    console.log(`Server running on port ${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();