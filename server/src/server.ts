// src/server.ts
import Fastify from 'fastify';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes'; // you'll use this later

const server = Fastify({ logger: true });

// Register routes
server.register(authRoutes);
server.register(adminRoutes);

// Start server
server.listen({ port: 5000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening at ${address}`);
});
